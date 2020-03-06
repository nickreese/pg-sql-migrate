"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class MigrationsLogTransform extends stream_1.Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(data, encoding, callback) {
        console.log(`[${data.id}] ${data.name}`);
        callback(null, data);
    }
}
exports.MigrationsLogTransform = MigrationsLogTransform;
//# sourceMappingURL=MigrationsLogTransform.js.map