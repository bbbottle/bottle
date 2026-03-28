import { Context } from 'hono';

interface DeviceActivity {
  lastActiveAt: string;
  paths: string[]; // 最近访问路径（保留最近10条）
  visitCount: number; // 总访问次数
  firstSeenAt: string; // 首次访问时间
}

export const trackDeviceActivity = async (c: Context, next: () => Promise<void>) => {
  // HTTP headers are case-insensitive, Hono normalizes them
  const fingerprint = c.req.header('X-Device-Fingerprint');

  if (fingerprint) {
    const key = `device:${fingerprint}:activity`;
    const existing = await c.env.KV.get(key);

    let activity: DeviceActivity;
    const now = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const currentPath = c.req.path;

    if (existing) {
      activity = JSON.parse(existing);
      activity.lastActiveAt = now;
      activity.visitCount += 1;
      // 保留最近10条路径，避免数据过大
      activity.paths = [currentPath, ...activity.paths].slice(0, 10);
    } else {
      activity = {
        lastActiveAt: now,
        firstSeenAt: now,
        visitCount: 1,
        paths: [currentPath],
      };
    }

    // 存储30天
    await c.env.KV.put(key, JSON.stringify(activity), {
      expirationTtl: 86400 * 30,
    });
  }

  await next();
};
