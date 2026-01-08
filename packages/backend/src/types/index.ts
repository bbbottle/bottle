export type User = {
  id: string;
  username: string;
  displayName: string;
};

export type Passkey = {
  id: string;
  userId: string;
  publicKey: string; // base64url
  counter: number;
  deviceType: "singleDevice" | "multiDevice";
  backedUp: boolean;
  transports?: string[]; // 存为 JSON 字符串
};
