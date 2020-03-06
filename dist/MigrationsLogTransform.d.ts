/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { Migration } from './types';
export declare class MigrationsLogTransform extends Transform {
    constructor();
    _transform(data: Migration, encoding: string, callback: TransformCallback): void;
}
