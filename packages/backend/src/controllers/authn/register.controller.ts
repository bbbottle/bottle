import {
  AuthenticatorTransport,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { Context } from "hono";
import { Buffer } from "node:buffer";
import { createDatabaseQuery } from "./db";

const rpID = "localhost"; // 主机名，不含协议

export const registerOptions = async (c: Context) => {
  const { username, displayName } = await c.req.json();
  const db = createDatabaseQuery(c);

  if (!username || !displayName) {
    return c.json({ error: "Missing username or displayName" }, 400);
  }

  let user = await db.getUserByUsername(username);
  if (!user) {
    // 创建新用户（实际中可能需先验证邮箱等）
    const crypto = c.env.crypto || globalThis.crypto;
    const userId = crypto.randomUUID();
    user = await db.createUser(userId, username, displayName);
  }

  const existingPasskeys = await db.listPasskeysByUserId(user.id);

  const options = await generateRegistrationOptions({
    rpName: "bbki.ng",
    rpID,
    userID: Buffer.from(user.id),
    userName: user.username,
    userDisplayName: user.displayName,
    timeout: 60000,
    attestationType: "none",
    excludeCredentials: existingPasskeys.map((pk) => ({
      id: atob(pk.id),
      transports: pk.transports as AuthenticatorTransport[],
    })),
    authenticatorSelection: {
      residentKey: "discouraged",
      userVerification: "discouraged",
    },
    supportedAlgorithmIDs: [-7, -257], // ES256, RS256
  });

  c.env.KV.put(username, options.challenge, {
    expirationTtl: 300, // 5 minutes
  });

  return c.json(options);
};
