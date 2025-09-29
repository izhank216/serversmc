import path from "path";
import fs from "fs-extra";
import AdmZip from "adm-zip";
import { ensureServerDir } from "../utils/config.js";

export function createBackup(serverName) {
  const dir = ensureServerDir(serverName);
  const worldDir = path.join(dir, "world");
  const backupFile = path.join(dir, `world-backup-${Date.now()}.zip`);

  if (!fs.existsSync(worldDir)) {
    console.log("⚠ No world folder found!");
    return;
  }

  const zip = new AdmZip();
  zip.addLocalFolder(worldDir);
  zip.writeZip(backupFile);

  console.log(`💾 Backup created: ${backupFile}`);
}

export function restoreBackup(serverName, backupPath) {
  const dir = ensureServerDir(serverName);
  const worldDir = path.join(dir, "world");

  if (!fs.existsSync(backupPath)) {
    console.log("⚠ Backup not found!");
    return;
  }

  fs.removeSync(worldDir);
  fs.ensureDirSync(worldDir);

  const zip = new AdmZip(backupPath);
  zip.extractAllTo(worldDir, true);

  console.log(`♻ Restored backup from: ${backupPath}`);
}
