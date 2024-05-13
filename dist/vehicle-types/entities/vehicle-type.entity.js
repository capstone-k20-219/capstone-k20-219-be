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
exports.VehicleType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
const parking_slot_entity_1 = require("../../parking-slots/entities/parking-slot.entity");
const service_entity_1 = require("../../services/entities/service.entity");
let VehicleType = class VehicleType extends base_entity_1.Base {
};
exports.VehicleType = VehicleType;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 3 }),
    __metadata("design:type", String)
], VehicleType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], VehicleType.prototype, "parkingFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], VehicleType.prototype, "slotBookingFee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.type),
    __metadata("design:type", Array)
], VehicleType.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parking_slot_entity_1.ParkingSlot, (slot) => slot.type),
    __metadata("design:type", Array)
], VehicleType.prototype, "slots", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.ServicePrice, (price) => price.type),
    __metadata("design:type", Array)
], VehicleType.prototype, "prices", void 0);
exports.VehicleType = VehicleType = __decorate([
    (0, typeorm_1.Entity)('vehicle_type')
], VehicleType);
//# sourceMappingURL=vehicle-type.entity.js.map