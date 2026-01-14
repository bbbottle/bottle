import { Context } from "hono";
import { Passkey, User } from "../../types";

export const createDatabaseQuery = (c: Context) => {
  const env = c.env;
  return {
    // 用户相关
    async getUserByUsername(username: string): Promise<User | null> {
      // TODO: 替换为 D1 SQL 查询
      const stmt = env.DB.prepare(
        "SELECT id, username, display_name FROM users WHERE username = ?",
      ).bind(username);
      const result = await stmt.first();
      return result
        ? {
            id: result.id as string,
            username: result.username as string,
            displayName: result.display_name as string,
          }
        : null;
    },

    async createUser(
      id: string,
      username: string,
      displayName: string,
    ): Promise<User> {
      await env.DB.prepare(
        "INSERT INTO users (id, username, display_name) VALUES (?, ?, ?)",
      )
        .bind(id, username, displayName)
        .run();
      return { id, username, displayName };
    },

    // Passkey 相关
    async getPasskeyById(credentialID: string): Promise<Passkey | null> {
      const stmt = env.DB.prepare("SELECT * FROM passkeys WHERE id = ?").bind(
        credentialID,
      );
      const row = await stmt.first();
      if (!row) return null;
      return {
        id: row.id as string,
        userId: row.user_id as string,
        publicKey: row.public_key as string,
        counter: row.counter as number,
        deviceType: row.device_type as "singleDevice" | "multiDevice",
        backedUp: Boolean(row.backed_up),
        transports: row.transports
          ? JSON.parse(row.transports as string)
          : undefined,
      };
    },

    async savePasskey(passkey: Passkey): Promise<void> {
      const transportsStr = passkey.transports
        ? JSON.stringify(passkey.transports)
        : null;
      await env.DB.prepare(
        `
      INSERT INTO passkeys (id, user_id, public_key, counter, device_type, backed_up, transports)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        counter = excluded.counter,
        backed_up = excluded.backed_up,
        transports = excluded.transports
    `,
      )
        .bind(
          passkey.id,
          passkey.userId,
          passkey.publicKey,
          passkey.counter,
          passkey.deviceType,
          passkey.backedUp ? 1 : 0,
          transportsStr,
        )
        .run();
    },

    async listPasskeysByUserId(userId: string): Promise<Passkey[]> {
      const stmt = env.DB.prepare(
        "SELECT * FROM passkeys WHERE user_id = ?",
      ).bind(userId);
      const rows = await stmt.all();
      return rows.results.map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        publicKey: row.public_key,
        counter: row.counter,
        deviceType: row.device_type,
        backedUp: Boolean(row.backed_up),
        transports: row.transports ? JSON.parse(row.transports) : undefined,
      }));
    },
  };
};
