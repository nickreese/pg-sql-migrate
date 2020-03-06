"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
new commander_1.Command()
    .command('create <name> [content]', 'Create a new migration')
    .command('execute', 'Execute outstanding migrations')
    .parse(process.argv);
//# sourceMappingURL=pg-migrate.js.map