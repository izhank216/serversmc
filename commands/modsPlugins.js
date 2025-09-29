import path from "path";
import fs from "fs-extra";
import axios from "axios";
import { ensureServerDir } from "../utils/config.js";

export async function addPlugin(serverName, url) {
  const dir = ensureServerDir(serverName);
  const pluginsDir = path.join(dir, "plugins");
  fs.ensureDirSync(pluginsDir);

  const fileName = url.split("/").pop();
  const filePath = path.join(pluginsDir, fileName);

  const res = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, res.data);

  console.log(`🔌 Plugin installed: ${fileName}`);
}

export async function addMod(serverName, url) {
  const dir = ensureServerDir(serverName);
  const modsDir = path.join(dir, "mods");
  fs.ensureDirSync(modsDir);

  const fileName = url.split("/").pop();
  const filePath = path.join(modsDir, fileName);

  const res = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, res.data);

  console.log(`🧩 Mod installed: ${fileName}`);
}
