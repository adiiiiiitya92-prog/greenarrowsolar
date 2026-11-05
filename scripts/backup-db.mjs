// Consistent online backup of the SQLite DB. Schedule daily (cron / Windows Task Scheduler):
//   node scripts/backup-db.mjs
// Keeps the newest BACKUP_KEEP (default 14) copies in ./backups. Copy that folder off-server too.
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const outDir = process.env.BACKUP_DIR ?? path.join(process.cwd(), "backups");
const keep = Number(process.env.BACKUP_KEEP ?? 14);
fs.mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const target = path.join(outDir, `app-${stamp}.db`);
const db = new DatabaseSync(path.join(dataDir, "app.db"));
db.exec(`VACUUM INTO '${target.replace(/'/g, "''")}'`);
db.close();
console.log("Backup written:", target);

const files = fs.readdirSync(outDir).filter((f) => f.startsWith("app-") && f.endsWith(".db")).sort();
for (const f of files.slice(0, Math.max(0, files.length - keep))) fs.unlinkSync(path.join(outDir, f));
