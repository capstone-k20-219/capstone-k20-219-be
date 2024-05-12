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
exports.ServiceBooking = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const parking_ticket_entity_1 = require("../../parking-tickets/entities/parking-ticket.entity");
const service_entity_1 = require("../../services/entities/service.entity");
let ServiceBooking = class ServiceBooking extends base_entity_1.Base {
};
exports.ServiceBooking = ServiceBooking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceBooking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceBooking.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceBooking.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ServiceBooking.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ServiceBooking.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ServiceBooking.prototype, "isDone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parking_ticket_entity_1.ParkingTicket, (ticket) => ticket.serviceBookings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'ticketId' }),
    __metadata("design:type", parking_ticket_entity_1.ParkingTicket)
], ServiceBooking.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.bookings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", service_entity_1.Service)
], ServiceBooking.prototype, "service", void 0);
exports.ServiceBooking = ServiceBooking = __decorate([
    (0, typeorm_1.Entity)('service_booking')
], ServiceBooking);
//# sourceMappingURL=service-booking.entity.js.map