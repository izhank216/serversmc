import path from "path";
import { ensureServerDir, readJSON, writeJSON } from "../utils/config.js";

export function opPlayer(serverName, username, online = true) {
  const dir = ensureServerDir(serverName);
  const file = path.join(dir, "ops.json");

  const ops = readJSON(file, []);
  ops.push({
    uuid: username, // simplification, can be UUID fetch later
    name: username,
    level: 4,
    bypassesPlayerLimit: true,
    online
  });

  writeJSON(file, ops);
  console.log(`⭐ ${username} is now an operator!`);
}
