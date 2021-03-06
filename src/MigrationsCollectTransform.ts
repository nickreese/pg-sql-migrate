import { Transform, TransformCallback } from 'stream';
import { Migration } from './types';

export class MigrationsCollectTransform extends Transform {
  public migrations: Migration[] = [];

  public constructor() {
    super({ objectMode: true });
  }

  public _transform(data: Migration, encoding: string, callback: TransformCallback): void {
    this.migrations.push(data);
    callback(null, data);
  }
}
