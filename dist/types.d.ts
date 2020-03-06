import { ClientConfig, ClientBase } from 'pg';
export interface Config {
    client: ClientConfig | string;
    directory: string;
    table: string;
}
export interface Migration {
    id: string;
    name: string;
    content: string;
}
export interface PGClient {
    query: ClientBase['query'];
}
export declare const DEFAULT_CONFIG_FILE = "pg-sql-migrate.config.json";
export declare const CONFIG_DEFAULTS: {
    directory: string;
    table: string;
};
