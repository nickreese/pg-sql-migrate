/// <reference types="node" />
import { Config, Migration, PGClient } from './types';
export declare const executeMigrations: (pg: PGClient, table: string, directory: string) => Promise<Migration[]>;
export declare const loadConfig: (file?: string, env?: NodeJS.ProcessEnv) => Config;
export declare const migrate: (config?: string | Partial<Config> | undefined, env?: NodeJS.ProcessEnv) => Promise<Migration[]>;
