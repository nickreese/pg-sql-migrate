/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { Migration } from './types';
export declare class MigrationsCollectTransform extends Transform {
    migrations: Migration[];
    constructor();
    _transform(data: Migration, encoding: string, callback: TransformCallback): void;
}
