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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const vehicles_service_1 = require("./vehicles.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const vehicle_dto_1 = require("./dtos/vehicle.dto");
const roles_guard_1 = require("../auth/roles.guard");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const roles_decorator_1 = require("../decorators/roles.decorator");
let VehiclesController = class VehiclesController {
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    async create(request, vehicle, res) {
        try {
            const { id: userId } = request['user'];
            const isDuplicate = await this.vehiclesService.findOne({
                where: { plateNo: vehicle.plateNo },
            });
            if (isDuplicate) {
                return res.status(400).send('vehicle_existed');
            }
            const result = await this.vehiclesService.create({
                userId: userId,
                ...vehicle,
            });
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findMyVehicles(request, res) {
        try {
            const { id: userId } = request['user'];
            const vehicles = await this.vehiclesService.find({
                select: {
                    id: true,
                    plateNo: true,
                    description: true,
                    userId: true,
                    type: { id: true, name: true },
                },
                where: { userId: userId },
                relations: { type: true },
            });
            return res.status(200).send(vehicles);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findOneByFilter(filter, res) {
        try {
            const result = await this.vehiclesService.find({
                select: {
                    id: true,
                    plateNo: true,
                    description: true,
                    userId: true,
                    type: { id: true, name: true },
                },
                where: filter,
                relations: { type: true },
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async update(request, updateVehicleDto, res) {
        try {
            const user = request['user'];
            const vehicle = await this.vehiclesService.getById(updateVehicleDto.id);
            if (!vehicle) {
                return res.status(400).send('vehicle_not_existed');
            }
            if (!user.roles.includes('manager') && user.id != vehicle.userId) {
                return res.status(403).send('Forbidden');
            }
            const result = await this.vehiclesService.update(updateVehicleDto.id, updateVehicleDto);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async delete(request, id, res) {
        try {
            const user = request['user'];
            const vehicle = await this.vehiclesService.getById(id);
            if (!vehicle) {
                return res.status(400).send('vehicle_not_existed');
            }
            if (!user.roles.includes('manager') && user.id != vehicle.userId) {
                return res.status(403).send('Forbidden');
            }
            const result = await this.vehiclesService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        vehicle_dto_1.CreateVehicleRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findMyVehicles", null);
__decorate([
    (0, common_1.Get)('/findByFilter'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.GetVehicleRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "findOneByFilter", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        vehicle_dto_1.UpdateVehicleRequestDto, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "delete", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, common_1.Controller)('vehicles'),
    (0, swagger_1.ApiTags)('Vehicles'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map