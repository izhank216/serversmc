# serversmc

**serversmc** is an npm package that lets you easily create and manage Minecraft servers from CLI.  
It supports automatic server setup, bans, ops, plugins, mods, backups, and more.

---

## Features
- Create a new Minecraft server with a random example IP.
- Automatically generates `eula.txt` (set to `true`), `server.properties`, `bans.json`, `ops.json`, and more.
- Manage bans:
  ```bash
  serversmc -ban "USERNAME" -reason "Cheating" -expires "7d"
