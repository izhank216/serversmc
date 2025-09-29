import fs from "fs-extra";
import path from "path";

export function ensureServerDir(name) {
  const dir = path.resolve(process.cwd(), name);
  fs.ensureDirSync(dir);
  return dir;
}

export function readJSON(file, fallback = {}) {
  try {
    return fs.readJsonSync(file);
  } catch {
    return fallback;
  }
}

export function writeJSON(file, data) {
  fs.writeJsonSync(file, data, { spaces: 2 });
}
