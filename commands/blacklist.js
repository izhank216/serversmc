import path from "path";
import { ensureServerDir, readJSON, writeJSON } from "../utils/config.js";

export function blacklistPlayer(serverName, username, reason = "Blacklisted", online = true) {
  const dir = ensureServerDir(serverName);
  const file = path.join(dir, "blacklist.json");

  const list = readJSON(file, []);
  list.push({
    name: username,
    reason,
    created: new Date().toISOString(),
    online
  });

  writeJSON(file, list);
  console.log(`🚫 ${username} blacklisted (${reason})`);
}
