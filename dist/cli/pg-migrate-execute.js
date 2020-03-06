"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const types_1 = require("../types");
const migrate_1 = require("../migrate");
const MigrationsWritable_1 = require("../MigrationsWritable");
const MigrationsReadable_1 = require("../MigrationsReadable");
const pg_1 = require("pg");
const stream_1 = require("stream");
const MigrationsLogTransform_1 = require("../MigrationsLogTransform");
const util_1 = require("util");
new commander_1.Command()
    .option('-d, --dry-run', 'Output results without running the migrations')
    .option('-c, --config <path>', 'Path to the configuration file', types_1.DEFAULT_CONFIG_FILE)
    .action(async ({ config, dryRun }) => {
    const { client, table, directory } = migrate_1.loadConfig(config);
    const pg = new pg_1.Client(client);
    await pg.connect();
    const read = new MigrationsReadable_1.MigrationsReadable(pg, table, directory);
    const log = new MigrationsLogTransform_1.MigrationsLogTransform();
    const sink = dryRun
        ? new stream_1.Writable({ objectMode: true, write: (data, encoding, cb) => cb() })
        : new MigrationsWritable_1.MigrationsWritable(pg, table);
    try {
        await util_1.promisify(stream_1.pipeline)(read, log, sink);
        console.log(`Finished`);
        await pg.end();
    }
    catch (error) {
        console.error(error);
        await pg.end();
        process.exit(1);
    }
})
    .parse(process.argv);
//# sourceMappingURL=pg-migrate-execute.js.map