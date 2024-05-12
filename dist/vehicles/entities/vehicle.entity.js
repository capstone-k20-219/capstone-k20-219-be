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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const vehicle_type_entity_1 = require("../../vehicle-types/entities/vehicle-type.entity");
const slot_booking_entity_1 = require("../../slot-bookings/entities/slot-booking.entity");
let Vehicle = class Vehicle extends base_entity_1.Base {
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "plateNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Vehicle.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.vehicles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Vehicle.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_type_entity_1.VehicleType, (type) => type.vehicles, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'typeId' }),
    __metadata("design:type", vehicle_type_entity_1.VehicleType)
], Vehicle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => slot_booking_entity_1.SlotBooking, (slotBooking) => slotBooking.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "slotBookings", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)('vehicle')
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map