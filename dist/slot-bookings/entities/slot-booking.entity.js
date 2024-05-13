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
exports.SlotBooking = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const parking_slot_entity_1 = require("../../parking-slots/entities/parking-slot.entity");
const vehicle_entity_1 = require("../../vehicles/entities/vehicle.entity");
let SlotBooking = class SlotBooking extends base_entity_1.Base {
};
exports.SlotBooking = SlotBooking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SlotBooking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SlotBooking.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SlotBooking.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], SlotBooking.prototype, "arrivalTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parking_slot_entity_1.ParkingSlot, (slot) => slot.bookings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", parking_slot_entity_1.ParkingSlot)
], SlotBooking.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.slotBookings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleId' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], SlotBooking.prototype, "vehicle", void 0);
exports.SlotBooking = SlotBooking = __decorate([
    (0, typeorm_1.Entity)('slot_booking')
], SlotBooking);
//# sourceMappingURL=slot-booking.entity.js.map