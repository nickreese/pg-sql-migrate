"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const types_1 = require("../types");
const migrate_1 = require("../migrate");
const fs_1 = require("fs");
const path_1 = require("path");
new commander_1.Command()
    .arguments('<name> [content]')
    .option('-c, --config <path>', 'Path to the configuration file', types_1.DEFAULT_CONFIG_FILE)
    .action(async (name, content, { config }) => {
    const { directory } = migrate_1.loadConfig(config);
    const file = `${new Date().toISOString()}_${name}.sql`;
    fs_1.writeFileSync(path_1.join(directory, file), content || '');
    console.log(`Created ${file}`);
})
    .parse(process.argv);
//# sourceMappingURL=pg-migrate-create.js.map