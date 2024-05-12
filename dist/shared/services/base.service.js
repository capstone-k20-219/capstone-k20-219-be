"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BaseService = class BaseService {
    constructor(repository, modelName) {
        this.repository = repository;
        this.modelName = modelName;
    }
    async create(dto) {
        const newObj = this.repository.create({ ...dto });
        const insertObj = this.repository.save(newObj);
        if (!insertObj) {
            throw Error(`Cannot create new ${this.modelName}`);
        }
        return insertObj;
    }
    async update(id, updateDto) {
        const updateObj = await this.repository.findOneBy({ id: id });
        Object.assign(updateObj, updateDto);
        const result = await this.repository.save(updateObj);
        return result != null;
    }
    async findOneAndUpdate(conditions, updateDto) {
        const updateObj = await this.repository.findOne(conditions);
        Object.assign(updateObj, updateDto);
        const result = await this.repository.save(updateObj);
        return result != null;
    }
    async findAll() {
        const objects = await this.repository.find();
        return objects;
    }
    async find(conditions) {
        return await this.repository.find(conditions);
    }
    async findOne(conditions) {
        return await this.repository.findOne(conditions);
    }
    async getById(id) {
        return await this.repository.findOneBy({ id: id });
    }
    async remove(id) {
        const deletedObj = await this.repository
            .createQueryBuilder()
            .delete()
            .where('id=:id', { id })
            .execute();
        return deletedObj.affected > 0;
    }
    async removeByConditions(conditions) {
        const deletedObj = await this.repository.delete(conditions);
        return deletedObj.affected > 0;
    }
    async count() {
        const result = await this.repository.count();
        return result;
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository, String])
], BaseService);
//# sourceMappingURL=base.service.js.map