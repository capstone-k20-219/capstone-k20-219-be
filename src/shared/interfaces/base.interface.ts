/**
 * Base service interface
 */
export interface IBaseService<T> {
  create(dto: Partial<Record<keyof T, unknown>>): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  findOne(conditions: Partial<Record<keyof T, unknown>>): Promise<T | null>;
  update(
    id: string,
    updateDto: Partial<Record<keyof T, unknown>>,
  ): Promise<boolean>;
  remove(id: string): Promise<boolean>;
}
