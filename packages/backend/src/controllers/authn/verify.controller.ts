import {
  RegistrationResponseJSON,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { Context } from "hono";
import { createDatabaseQuery } from "./db";

const rpID = "localhost"; // 主机名，不含协议
const origin = `http://${rpID}:8787`; // 完整的来源 URL，含协议和端口

export const verify = async (c: Context) => {
  const {
    username,
    response,
  }: { username: string; response: RegistrationResponseJSON } =
    await c.req.json();
  const db = createDatabaseQuery(c);

  const user = await db.getUserByUsername(username);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  const challenge = c.env.KV.get(username);

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });
  } catch (error) {
    console.error("Registration verification failed:", error);
    return c.json({ error: "Registration failed" }, 400);
  }

  const { verified, registrationInfo } = verification;

  if (!verified || !registrationInfo) {
    return c.json({ error: "Registration not verified" }, 400);
  }

  const { credential, credentialDeviceType, credentialBackedUp } =
    registrationInfo;

  // 将 credentialID 转为 base64url 字符串作为主键
  const credentialIDStr = credential.id
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const publicKeyStr = btoa(String.fromCharCode(...credential.publicKey))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  await db.savePasskey({
    id: credentialIDStr,
    userId: user.id,
    publicKey: publicKeyStr,
    counter: credential.counter,
    deviceType: credentialDeviceType,
    backedUp: credentialBackedUp,
    transports: credential.transports,
  });

  return c.json({ verified: true });
};
