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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const services_request_dto_1 = require("./dtos/services.request.dto");
const idGenerator_1 = require("../shared/helpers/idGenerator");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async create(service, res) {
        try {
            const latest = await this.servicesService.find({
                skip: 0,
                take: 1,
                order: { createdAt: 'DESC' },
            });
            let number = 1;
            if (latest.length)
                number = Number(latest[0].id.substring(1)) + 1;
            const newService = { ...service, id: (0, idGenerator_1.idGenerator)(3, number, 'S') };
            const result = await this.servicesService.create(newService);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getAll(res) {
        try {
            const result = await this.servicesService.find({
                select: {
                    id: true,
                    name: true,
                    prices: { type: { id: true, name: true }, unitPrice: true },
                },
                relations: { prices: { type: true } },
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findByFilter(query, res) {
        try {
            const filter = {};
            if (query.id)
                filter['id'] = query.id;
            if (query.typeId)
                filter['prices'] = { typeId: query.typeId };
            const result = await this.servicesService.find({
                select: {
                    id: true,
                    name: true,
                    prices: { type: { id: true, name: true }, unitPrice: true },
                },
                relations: { prices: { type: true } },
                where: filter,
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async update(updateServiceDto, res) {
        try {
            const result = await this.servicesService.update(updateServiceDto.id, updateServiceDto);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async delete(id, res) {
        try {
            const result = await this.servicesService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_request_dto_1.CreateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_request_dto_1.GetServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByFilter", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [services_request_dto_1.UpdateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "delete", null);
exports.ServicesController = ServicesController = __decorate([
    (0, common_1.Controller)('services'),
    (0, swagger_1.ApiTags)('Services'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map