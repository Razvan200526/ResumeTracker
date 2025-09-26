import {
  DataSource,
  type EntityManager,
  type EntityTarget,
  type ObjectLiteral,
  type Repository,
} from 'typeorm';
import { PrimaryEntities } from './entities';

export class PrimaryDatabase {
  private source: DataSource;
  private url: string;
  constructor() {
    // Prefer environment variable, fallback to a sensible local default
    this.url =
      process.env.DATABASE_URL || 'postgres://resai:resai@localhost:5432/resai';
  }

  public getSource(): DataSource {
    if (this.source) {
      return this.source;
    }

    this.source = new DataSource({
      type: 'postgres',
      url: this.url,
      synchronize: true,
      entities: PrimaryEntities,
      extra: {
        max: 10,
      },
    });

    return this.source;
  }

  public async open<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ): Promise<Repository<Entity>> {
    const source = this.getSource();

    if (!source.isInitialized) {
      await source.initialize();
    }

    return source.getRepository(entity);
  }

  public async close(): Promise<void> {
    const source = this.getSource();
    if (source.isInitialized) {
      await source.destroy();
    }
  }

  public getEntityManager(): EntityManager {
    return this.getSource().manager;
  }
}
