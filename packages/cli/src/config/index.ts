import { mkdir, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';
import type { Config } from './types.js';

const CONFIG_DIR = join(homedir(), '.bbking');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

export async function getConfig(): Promise<Config> {
  try {
    const data = await readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data) as Config;
  } catch {
    return {};
  }
}

export async function saveConfig(config: Config): Promise<void> {
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export async function clearConfig(): Promise<void> {
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_FILE, '{}', 'utf-8');
}

export function isTokenValid(config: Config): boolean {
  return !!config.apiKey && config.apiKey.length > 0;
}
