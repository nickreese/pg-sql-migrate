"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_file_1 = require("@ovotech/config-file");
const pg_1 = require("pg");
const _1 = require("./");
const types_1 = require("./types");
const stream_1 = require("stream");
const util_1 = require("util");
const MigrationsCollectTransform_1 = require("./MigrationsCollectTransform");
exports.executeMigrations = async (pg, table, directory) => {
    const read = new _1.MigrationsReadable(pg, table, directory);
    const sink = new _1.MigrationsWritable(pg, table);
    const collect = new MigrationsCollectTransform_1.MigrationsCollectTransform();
    await util_1.promisify(stream_1.pipeline)(read, collect, sink);
    return collect.migrations;
};
exports.loadConfig = (file = types_1.DEFAULT_CONFIG_FILE, env = process.env) => config_file_1.loadConfigFile({ file, env, defaults: types_1.CONFIG_DEFAULTS, required: ['client'] });
exports.migrate = async (config, env = process.env) => {
    const { client, table, directory } = typeof config === 'object' ? { ...types_1.CONFIG_DEFAULTS, ...config } : exports.loadConfig(config, env);
    const pg = new pg_1.Client(client);
    await pg.connect();
    const results = await exports.executeMigrations(pg, table, directory);
    await pg.end();
    return results;
};
//# sourceMappingURL=migrate.js.map