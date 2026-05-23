import fs from "fs/promises";
import path from "path";
import { hashPassword } from "./password";

export type AdminAuthRecord = {
  email: string;
  passwordHash: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");

const DEFAULT_EMAIL = "admin@seglko.org";
const DEFAULT_PASSWORD = "admin123";

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: DEFAULT_EMAIL,
  password: DEFAULT_PASSWORD,
};

export async function ensureAdminAuthFile(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(AUTH_FILE);
  } catch {
    const defaultRecord: AdminAuthRecord = {
      email: DEFAULT_EMAIL,
      passwordHash: hashPassword(DEFAULT_PASSWORD),
    };
    await fs.writeFile(AUTH_FILE, JSON.stringify(defaultRecord, null, 2));
  }
}

export async function getAdminAuth(): Promise<AdminAuthRecord> {
  await ensureAdminAuthFile();
  const raw = await fs.readFile(AUTH_FILE, "utf-8");
  return JSON.parse(raw) as AdminAuthRecord;
}

export async function saveAdminAuth(record: AdminAuthRecord): Promise<void> {
  await ensureAdminAuthFile();
  await fs.writeFile(AUTH_FILE, JSON.stringify(record, null, 2));
}
