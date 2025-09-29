import fs from "fs-extra";
import path from "path";
import { ensureServerDir, writeJSON } from "../utils/config.js";
import { generateRandomIP } from "../utils/randomIP.js";

export function createServer(name) {
  const dir = ensureServerDir(name);
  const serverConfig = path.join(dir, "server.json");

  if (fs.existsSync(serverConfig)) {
    console.log("⚠ Server already exists!");
    return;
  }

  // Generate random IP
  const randomIP = generateRandomIP();

  // Write configs
  fs.writeFileSync(path.join(dir, "eula.txt"), "eula=true\n");
  fs.writeFileSync(path.join(dir, "server.properties"), `server-ip=${randomIP}\nserver-port=25565\nmotd=My Minecraft Server`);

  writeJSON(path.join(dir, "banned-players.json"), []);
  writeJSON(path.join(dir, "ops.json"), []);
  writeJSON(path.join(dir, "blacklist.json"), []);

  writeJSON(serverConfig, {
    name,
    created: new Date().toISOString(),
    ip: randomIP
  });

  console.log(`✅ Server "${name}" created with IP: ${randomIP}`);
}
