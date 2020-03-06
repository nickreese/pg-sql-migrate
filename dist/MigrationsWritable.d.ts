/// <reference types="node" />
import { Writable } from 'stream';
import { Migration, PGClient } from './types';
export declare class MigrationsWritable extends Writable {
    private pg;
    private table;
    constructor(pg: PGClient, table: string);
    _write(migration: Migration, encoding: string, callback: (error?: Error | null) => void): Promise<void>;
}
