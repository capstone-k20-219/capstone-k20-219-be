import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { IBaseService } from '../interfaces/base.interface';

@Injectable()
export abstract class BaseService<T extends Document>
  implements IBaseService<T>
{
  private readonly modelName: string;

  constructor(private readonly model: Model<T>) {
    for (const modelName of Object.keys(model.collection.conn.models)) {
      if (model.collection.conn.models[modelName] === this.model) {
        this.modelName = modelName;
        break;
      }
    }
  }

  async create(dto: Partial<Record<keyof T, unknown>>): Promise<T | null> {
    const newObj = await this.model.create({ ...dto });

    if (!newObj) {
      throw Error(`Cannot create new ${this.modelName}`);
    }
    return newObj;
  }

  async update(
    id: string,
    updateDto: Partial<Record<keyof T, unknown>>,
  ): Promise<boolean> {
    const updateObject = await this.model.updateOne(
      { _id: id },
      { $set: updateDto },
    );
    return updateObject.acknowledged;
  }

  async findAll(): Promise<T[] | null> {
    const objects = await this.model.find().exec();
    return objects;
  }

  async find(conditions: Partial<Record<keyof T, unknown>>): Promise<T[]> {
    const test = conditions as FilterQuery<T>;
    return await this.model.find(conditions as FilterQuery<T>).exec();
  }

  async findOne(
    conditions: Partial<Record<keyof T, unknown>>,
  ): Promise<T | null> {
    const object = await this.model.findOne(conditions as FilterQuery<T>);
    return object;
  }

  async getById(id: string): Promise<T | null> {
    return await this.model.findOne({ _id: id }).exec();
  }

  async getByIds(ids: string[]): Promise<T[] | null> {
    return await this.model.find({ _id: { $in: ids } }).exec();
  }

  async updateByCode(
    code: string,
    updateDto: Partial<Record<keyof T, unknown>>,
  ): Promise<boolean> {
    const updateObject = await this.model.replaceOne({ code: code }, updateDto);
    return updateObject.acknowledged;
  }

  async findOneAndUpdate(
    filters: Partial<Record<keyof T, unknown>>,
    updateDto: Partial<Record<keyof T, unknown>>,
  ): Promise<T | null> {
    const updatedObject = await this.model.findOneAndUpdate(
      filters as FilterQuery<T>,
      { $set: updateDto },
      {
        new: true,
      },
    );
    return updatedObject;
  }

  async remove(id: string): Promise<boolean> {
    const object = await this.model.findOne({ _id: id }).exec();
    const deletedObject = await this.model.deleteOne({ _id: id });
    return deletedObject.deletedCount > 0;
  }

  async removeByConditions(
    conditions: Partial<Record<keyof T, unknown>>,
  ): Promise<boolean> {
    const deletedObject = await this.model.deleteMany(
      conditions as FilterQuery<T>,
    );
    return deletedObject.deletedCount > 0;
  }
}
