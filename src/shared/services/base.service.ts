import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Base } from '../entities/base.entity';
import { IBaseService } from '../interfaces/base.interface';

@Injectable()
export abstract class BaseService<T extends Base> implements IBaseService<T> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly modelName: string,
  ) {}

  async create(dto: Partial<Record<keyof T, unknown>>): Promise<T | null> {
    const newObj = this.repository.create({ ...dto } as DeepPartial<T>);
    const insertObj = this.repository.save(newObj);
    if (!insertObj) {
      throw Error(`Cannot create new ${this.modelName}`);
    }
    return insertObj;
  }

  async update(
    id: number | string,
    updateDto: Partial<Record<keyof T, unknown>>,
  ) {
    const updateObj = await this.repository.findOneBy({ id: id } as any);
    Object.assign(updateObj, updateDto);
    const result = await this.repository.save(updateObj);
    return result != null;
  }

  async findAll(): Promise<T[] | null> {
    const objects = await this.repository.find();
    return objects;
  }

  async find(conditions: any): Promise<T[] | null> {
    return await this.repository.find(conditions as FindManyOptions<T>);
  }

  async findOne(conditions: any): Promise<T> {
    return await this.repository.findOne(conditions as FindOneOptions<T>);
  }

  async getById(id: string | number): Promise<T> {
    return await this.repository.findOneBy({ id: id } as any);
  }

  async remove(id: number | string): Promise<boolean> {
    const deletedObj = await this.repository
      .createQueryBuilder()
      .delete()
      .where('id=:id', { id })
      .execute();

    return deletedObj.affected > 0;
  }

  async removeByConditions(conditions: any): Promise<boolean> {
    const deletedObj = await this.repository.delete(
      conditions as FindOptionsWhere<T>,
    );
    return deletedObj.affected > 0;
  }

  async count(): Promise<number> {
    const result = await this.repository.count();
    return result;
  }
}
