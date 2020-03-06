"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class MigrationsCollectTransform extends stream_1.Transform {
    constructor() {
        super({ objectMode: true });
        this.migrations = [];
    }
    _transform(data, encoding, callback) {
        this.migrations.push(data);
        callback(null, data);
    }
}
exports.MigrationsCollectTransform = MigrationsCollectTransform;
//# sourceMappingURL=MigrationsCollectTransform.js.map