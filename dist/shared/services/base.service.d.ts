import { Repository } from 'typeorm';
import { Base } from '../entities/base.entity';
import { IBaseService } from '../interfaces/base.interface';
export declare abstract class BaseService<T extends Base> implements IBaseService<T> {
    private readonly repository;
    private readonly modelName;
    constructor(repository: Repository<T>, modelName: string);
    create(dto: Partial<Record<keyof T, unknown>>): Promise<T | null>;
    update(id: number | string, updateDto: Partial<Record<keyof T, unknown>>): Promise<boolean>;
    findOneAndUpdate(conditions: any, updateDto: Partial<Record<keyof T, unknown>>): Promise<boolean>;
    findAll(): Promise<T[] | null>;
    find(conditions: any): Promise<T[] | null>;
    findOne(conditions: any): Promise<T>;
    getById(id: string | number): Promise<T>;
    remove(id: number | string): Promise<boolean>;
    removeByConditions(conditions: any): Promise<boolean>;
    count(): Promise<number>;
}
