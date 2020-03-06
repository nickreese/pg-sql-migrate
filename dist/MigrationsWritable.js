"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const MigrationError_1 = require("./MigrationError");
class MigrationsWritable extends stream_1.Writable {
    constructor(pg, table) {
        super({ objectMode: true });
        this.pg = pg;
        this.table = table;
    }
    async _write(migration, encoding, callback) {
        try {
            await this.pg.query('BEGIN');
            await this.pg.query(migration.content);
            await this.pg.query(`INSERT INTO ${this.table} VALUES ($1)`, [migration.id]);
            await this.pg.query('COMMIT');
            callback(null);
        }
        catch (error) {
            try {
                await this.pg.query('ROLLBACK');
            }
            finally {
                callback(new MigrationError_1.MigrationError(error.message, migration));
            }
        }
    }
}
exports.MigrationsWritable = MigrationsWritable;
//# sourceMappingURL=MigrationsWritable.js.map