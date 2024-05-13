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
exports.ParkingTicket = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const service_booking_entity_1 = require("../../service-bookings/entities/service-booking.entity");
const parking_slot_entity_1 = require("../../parking-slots/entities/parking-slot.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let ParkingTicket = class ParkingTicket extends base_entity_1.Base {
};
exports.ParkingTicket = ParkingTicket;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ParkingTicket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParkingTicket.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ParkingTicket.prototype, "plateNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ParkingTicket.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ParkingTicket.prototype, "checkOutTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ParkingTicket.prototype, "parkingCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ParkingTicket.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_booking_entity_1.ServiceBooking, (booking) => booking.ticket),
    __metadata("design:type", Array)
], ParkingTicket.prototype, "serviceBookings", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parking_slot_entity_1.ParkingSlot, (slot) => slot.tickets, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'slotId' }),
    __metadata("design:type", parking_slot_entity_1.ParkingSlot)
], ParkingTicket.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tickets, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ParkingTicket.prototype, "user", void 0);
exports.ParkingTicket = ParkingTicket = __decorate([
    (0, typeorm_1.Entity)('parking_ticket')
], ParkingTicket);
//# sourceMappingURL=parking-ticket.entity.js.map