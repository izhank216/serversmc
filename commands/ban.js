import path from "path";
import { ensureServerDir, readJSON, writeJSON } from "../utils/config.js";
import { v4 as uuidv4 } from "uuid";

export function banPlayer(serverName, username, reason = "Banned", expires = "Forever", online = true) {
  const dir = ensureServerDir(serverName);
  const file = path.join(dir, "banned-players.json");

  const bans = readJSON(file, []);
  bans.push({
    uuid: uuidv4(),
    name: username,
    created: new Date().toISOString(),
    source: "Server",
    expires,
    reason,
    online
  });

  writeJSON(file, bans);
  console.log(`⛔ ${username} banned for: ${reason} (Expires: ${expires})`);
}
