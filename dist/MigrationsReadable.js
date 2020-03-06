"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
exports.nameParts = (name) => {
    const [first, ...rest] = name.split('_');
    return [first, rest.join("_")];
};
class MigrationsReadable extends stream_1.Readable {
    constructor(pg, table, directory) {
        super({ objectMode: true });
        this.current = 0;
        this.pg = pg;
        this.table = table;
        this.directory = directory;
    }
    async initialize() {
        const migrationFiles = fs_1.readdirSync(this.directory).filter(file => file.endsWith('.sql'));
        await this.initState();
        const completed = await this.loadState();
        this.migrationFiles = migrationFiles.filter(file => !completed.includes(exports.nameParts(file)[0]));
    }
    async next() {
        if (!this.migrationFiles) {
            await this.initialize();
        }
        if (this.migrationFiles && this.migrationFiles[this.current]) {
            const file = this.migrationFiles[this.current++];
            const [id, name] = exports.nameParts(file);
            const content = fs_1.readFileSync(path_1.join(this.directory, file)).toString();
            const migration = { id, name, content };
            return migration;
        }
        else {
            return null;
        }
    }
    async _read() {
        this.push(await this.next());
    }
    async initState() {
        return await this.pg.query(`CREATE TABLE IF NOT EXISTS ${this.table} (id VARCHAR PRIMARY KEY)`);
    }
    async loadState() {
        return (await this.pg.query(`SELECT id FROM ${this.table}`)).rows.map(row => row.id);
    }
}
exports.MigrationsReadable = MigrationsReadable;
//# sourceMappingURL=MigrationsReadable.js.map