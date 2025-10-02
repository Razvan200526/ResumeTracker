import { NotFoundException } from '@backend/middleware/exceptions/exceptions';
import {
  type PrimaryDatabase,
  primaryDatabase,
} from '@backend/shared/database/PrimaryDatabase';
import type {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';
import { ResumeEntity } from './ResumeEntity';

export class ResumeRepository {
  private database: PrimaryDatabase;
  constructor() {
    this.database = primaryDatabase;
  }

  public async open(): Promise<Repository<ResumeEntity>> {
    return await this.database.open(ResumeEntity);
  }

  public async close(): Promise<void> {
    await this.database.close();
  }

  private getFindOneOptions(): FindOneOptions<ResumeEntity> {
    return {
      select: {
        id: true,
        filename: true,
        url: true,
        filetype: true,
        filesize: true,
        uploadedAt: true,
        user: {
          id: true,
          email: true,
          name: true,
          firstName: true,
          lastName: true,
        },
      },
      relations: {
        user: true,
      },
    };
  }

  public async find(
    criteria: FindManyOptions<ResumeEntity>,
  ): Promise<ResumeEntity[] | null> {
    const repository = await this.open();

    return await repository.find({
      ...this.getFindOneOptions(),
      ...criteria,
    });
  }

  public async findOne(id: number): Promise<ResumeEntity | null> {
    const repository = await this.open();

    return await repository.findOne({
      ...this.getFindOneOptions(),
      where: { id },
    });
  }

  public async findOneBy(
    criteria: FindOptionsWhere<ResumeEntity>,
  ): Promise<ResumeEntity | null> {
    const repository = await this.open();

    return await repository.findOne({
      ...this.getFindOneOptions(),
      where: criteria,
    });
  }

  public async findOneOrFail(id: number): Promise<ResumeEntity> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new NotFoundException('Resume not found');
    }

    return entity;
  }

  public async findOneByOrFail(
    criteria: FindOptionsWhere<ResumeEntity>,
  ): Promise<ResumeEntity> {
    const entity = await this.findOneBy(criteria);

    if (!entity) {
      throw new NotFoundException('Resume not found');
    }

    return entity;
  }

  public async findByUserId(userId: string): Promise<ResumeEntity[]> {
    const repository = await this.open();

    return await repository.find({
      ...this.getFindOneOptions(),
      where: { user: { id: userId } },
    });
  }

  public async findByIds(ids: number[]): Promise<ResumeEntity[]> {
    const repository = await this.open();

    return await repository.find({
      ...this.getFindOneOptions(),
      where: ids.map((id) => ({ id })),
    });
  }

  public async create(
    entity: ResumeEntity,
    options?: SaveOptions,
  ): Promise<ResumeEntity> {
    const repository = await this.open();

    return await repository.save(entity, options);
  }

  public async createMany(
    entities: ResumeEntity[],
    options?: SaveOptions,
  ): Promise<ResumeEntity[]> {
    const repository = await this.open();

    return await repository.save(entities, options);
  }

  public async update(
    entity: ResumeEntity,
    options?: SaveOptions,
  ): Promise<ResumeEntity> {
    return await this.create(entity, options);
  }

  public async updateMany(
    entities: ResumeEntity[],
    options?: SaveOptions,
  ): Promise<ResumeEntity[]> {
    return await this.createMany(entities, options);
  }

  public async delete(
    criteria: FindOptionsWhere<ResumeEntity> | FindOptionsWhere<ResumeEntity>[],
  ): Promise<DeleteResult> {
    const repository = await this.open();

    return await repository.delete(criteria);
  }

  public async deleteByIds(ids: number[]): Promise<DeleteResult> {
    const repository = await this.open();

    return await repository.delete(ids);
  }

  public async count(
    criteria?:
      | FindOptionsWhere<ResumeEntity>
      | FindOptionsWhere<ResumeEntity>[],
  ): Promise<number> {
    const repository = await this.open();

    return await repository.count({ where: criteria });
  }
}

export const resumeRepository = new ResumeRepository();
