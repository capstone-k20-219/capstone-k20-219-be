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
exports.ParkingSlotsController = void 0;
const common_1 = require("@nestjs/common");
const parking_slots_service_1 = require("./parking-slots.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const parking_slot_dto_1 = require("./dtos/parking-slot.dto");
let ParkingSlotsController = class ParkingSlotsController {
    constructor(parkingSlotsService) {
        this.parkingSlotsService = parkingSlotsService;
    }
    async create(parkingSlot, res) {
        try {
            const isDuplicate = await this.parkingSlotsService.getById(parkingSlot.id);
            if (isDuplicate) {
                return res.status(400).send('code_existed');
            }
            const result = await this.parkingSlotsService.create(parkingSlot);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async upsert(upsertDto, res) {
        const currentSlots = await this.parkingSlotsService.find({
            select: ['id'],
        });
        const currentSlotsId = currentSlots.map((slot) => slot.id);
        const deletedId = [];
        const dtoIds = upsertDto.slots.map((item) => item.id);
        for (const id of currentSlotsId) {
            if (!dtoIds.includes(id))
                deletedId.push(id);
        }
        if (deletedId.length)
            await this.parkingSlotsService.removeByConditions(deletedId);
        await this.parkingSlotsService.upsert(upsertDto.slots);
        res.status(200).send(true);
    }
    async findByFilter(filter, res) {
        try {
            const result = await this.parkingSlotsService.find({
                select: {
                    id: true,
                    x_start: true,
                    x_end: true,
                    y_start: true,
                    y_end: true,
                    typeId: true,
                    type: { name: true },
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
    async update(updateParkingSlotDto, res) {
        try {
            const result = await this.parkingSlotsService.update(updateParkingSlotDto.id, updateParkingSlotDto);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async delete(id, res) {
        try {
            const result = await this.parkingSlotsService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.ParkingSlotsController = ParkingSlotsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_slot_dto_1.CreateParkingSlotDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingSlotsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/upsert'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_slot_dto_1.UpsertParkingSlotDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingSlotsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_slot_dto_1.GetParkingSlotDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingSlotsController.prototype, "findByFilter", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_slot_dto_1.UpdateParkingSlotDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingSlotsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParkingSlotsController.prototype, "delete", null);
exports.ParkingSlotsController = ParkingSlotsController = __decorate([
    (0, common_1.Controller)('parking-slots'),
    (0, swagger_1.ApiTags)('Parking slots'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [parking_slots_service_1.ParkingSlotsService])
], ParkingSlotsController);
//# sourceMappingURL=parking-slots.controller.js.map