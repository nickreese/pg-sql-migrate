import { Migration } from './types';
export declare class MigrationError extends Error {
    migration: Migration;
    constructor(message: string | undefined, migration: Migration);
}
