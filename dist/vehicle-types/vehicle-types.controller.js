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
exports.VehicleTypesController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_types_service_1 = require("./vehicle-types.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const vehicle_type_dto_1 = require("./dtos/vehicle-type.dto");
let VehicleTypesController = class VehicleTypesController {
    constructor(vehicleTypesService) {
        this.vehicleTypesService = vehicleTypesService;
    }
    async create(type, res) {
        try {
            const isDuplicate = await this.vehicleTypesService.getById(type.id);
            if (isDuplicate) {
                return res.status(400).send('typeId_existed');
            }
            type.id = type.id.toUpperCase();
            const result = await this.vehicleTypesService.create(type);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getAll(filter, res) {
        try {
            const types = await this.vehicleTypesService.find({
                select: ['id', 'name', 'parkingFee', 'slotBookingFee'],
                where: filter,
            });
            return res.status(200).send(types);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async update(updateVehicleTypeDto, res) {
        try {
            const result = await this.vehicleTypesService.update(updateVehicleTypeDto.id, updateVehicleTypeDto);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async delete(id, res) {
        try {
            const result = this.vehicleTypesService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.VehicleTypesController = VehicleTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_type_dto_1.CreateVehicleTypeRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_type_dto_1.GetVehicleTypeRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_type_dto_1.UpdateVehicleTypeRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VehicleTypesController.prototype, "delete", null);
exports.VehicleTypesController = VehicleTypesController = __decorate([
    (0, common_1.Controller)('vehicle-types'),
    (0, swagger_1.ApiTags)('VehicleTypes'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [vehicle_types_service_1.VehicleTypesService])
], VehicleTypesController);
//# sourceMappingURL=vehicle-types.controller.js.map