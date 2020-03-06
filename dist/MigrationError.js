"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MigrationError extends Error {
    constructor(message, migration) {
        super(message);
        this.migration = migration;
    }
}
exports.MigrationError = MigrationError;
//# sourceMappingURL=MigrationError.js.map