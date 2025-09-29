#!/usr/bin/env node
import { Command } from "commander";
import { createServer } from "./commands/create.js";
import { banPlayer } from "./commands/ban.js";
import { opPlayer } from "./commands/op.js";
import { blacklistPlayer } from "./commands/blacklist.js";
import { createBackup, restoreBackup } from "./commands/backup.js";
import { addPlugin, addMod } from "./commands/modsPlugins.js";

const program = new Command();

program
  .command("create <name>")
  .description("Create a new server")
  .action(createServer);

program
  .command("ban <server> <username>")
  .option("-reason <reason>", "Reason for ban", "Banned")
  .option("-expires <time>", "Expiry time", "Forever")
  .option("-offline", "Ban offline account")
  .action((server, username, opts) => {
    banPlayer(server, username, opts.reason, opts.expires, !opts.offline);
  });

program
  .command("op <server> <username>")
  .option("-offline", "Op offline account")
  .action((server, username, opts) => {
    opPlayer(server, username, !opts.offline);
  });

program
  .command("blacklist <server> <username>")
  .option("-reason <reason>", "Reason", "Blacklisted")
  .option("-offline", "Blacklist offline account")
  .action((server, username, opts) => {
    blacklistPlayer(server, username, opts.reason, !opts.offline);
  });

program
  .command("create-backup <server>")
  .description("Create a world backup")
  .action(createBackup);

program
  .command("backup-use <server> <zip>")
  .description("Restore a backup")
  .action(restoreBackup);

program
  .command("add-plugin <server> <url>")
  .description("Add plugin (Spigot/Bukkit/Arclight)")
  .action(addPlugin);

program
  .command("add-mod <server> <url>")
  .description("Add mod (Forge/Fabric/Arclight)")
  .action(addMod);

program.parse(process.argv);
