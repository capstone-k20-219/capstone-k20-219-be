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
exports.ParkingSlot = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const vehicle_type_entity_1 = require("../../vehicle-types/entities/vehicle-type.entity");
const parking_ticket_entity_1 = require("../../parking-tickets/entities/parking-ticket.entity");
const slot_booking_entity_1 = require("../../slot-bookings/entities/slot-booking.entity");
let ParkingSlot = class ParkingSlot extends base_entity_1.Base {
};
exports.ParkingSlot = ParkingSlot;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], ParkingSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], ParkingSlot.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "x_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "x_end", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "y_start", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ParkingSlot.prototype, "y_end", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_type_entity_1.VehicleType, (type) => type.slots, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'typeId' }),
    __metadata("design:type", vehicle_type_entity_1.VehicleType)
], ParkingSlot.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parking_ticket_entity_1.ParkingTicket, (ticket) => ticket.slot),
    __metadata("design:type", Array)
], ParkingSlot.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => slot_booking_entity_1.SlotBooking, (booking) => booking.slot),
    __metadata("design:type", Array)
], ParkingSlot.prototype, "bookings", void 0);
exports.ParkingSlot = ParkingSlot = __decorate([
    (0, typeorm_1.Entity)('parking_slot')
], ParkingSlot);
//# sourceMappingURL=parking-slot.entity.js.map