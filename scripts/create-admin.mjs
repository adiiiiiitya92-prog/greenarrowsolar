// Usage: node scripts/create-admin.mjs <email> <password> [admin|viewer]
import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const [email, password, role = "admin"] = process.argv.slice(2);
if (!email || !password || password.length < 10 || !["admin", "viewer"].includes(role)) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password (min 10 chars)> [admin|viewer]");
  process.exit(1);
}
const dir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
fs.mkdirSync(dir, { recursive: true });
const db = new DatabaseSync(path.join(dir, "app.db"));
db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','viewer')), created_at TEXT NOT NULL DEFAULT (datetime('now')));`);
const salt = randomBytes(16);
const hash = `${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`;
db.prepare(
  "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET password_hash=excluded.password_hash, role=excluded.role",
).run(email.toLowerCase(), hash, role);
console.log(`User ${email} saved with role ${role}.`);
