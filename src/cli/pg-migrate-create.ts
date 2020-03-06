import { Command } from 'commander';
import { DEFAULT_CONFIG_FILE } from '../types';
import { loadConfig } from '../migrate';
import { writeFileSync } from 'fs';
import { join } from 'path';

new Command()
  .arguments('<name> [content]')
  .option('-c, --config <path>', 'Path to the configuration file', DEFAULT_CONFIG_FILE)
  .action(async (name: string, content: string | undefined, { config }: { config?: string }) => {
    const { directory } = loadConfig(config);
    const d = new Date().toISOString().replace("T", "_").substr(0,18);
    const file = `${d}_${name}.sql`

    writeFileSync(join(directory, file), content || '');

    console.log(`Created ${file}`);
  })
  .parse(process.argv);
