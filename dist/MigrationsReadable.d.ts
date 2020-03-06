/// <reference types="node" />
import { Readable } from 'stream';
import { PGClient } from './types';
export declare const nameParts: (name: string) => string[];
export declare class MigrationsReadable extends Readable {
    private current;
    private migrationFiles?;
    private pg;
    private table;
    private directory;
    constructor(pg: PGClient, table: string, directory: string);
    private initialize;
    private next;
    _read(): Promise<void>;
    private initState;
    private loadState;
}
