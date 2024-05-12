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
exports.ServicePrice = exports.Service = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/entities/base.entity");
const vehicle_type_entity_1 = require("../../vehicle-types/entities/vehicle-type.entity");
const comment_entity_1 = require("../../comments/entities/comment.entity");
const service_booking_entity_1 = require("../../service-bookings/entities/service-booking.entity");
let Service = class Service extends base_entity_1.Base {
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServicePrice, (price) => price.service, { cascade: true }),
    __metadata("design:type", Array)
], Service.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.service),
    __metadata("design:type", Array)
], Service.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_booking_entity_1.ServiceBooking, (booking) => booking.service),
    __metadata("design:type", Array)
], Service.prototype, "bookings", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)('service')
], Service);
let ServicePrice = class ServicePrice extends typeorm_1.BaseEntity {
};
exports.ServicePrice = ServicePrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServicePrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServicePrice.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], ServicePrice.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Service, (service) => service.prices, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", Service)
], ServicePrice.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_type_entity_1.VehicleType, (type) => type.prices, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'typeId' }),
    __metadata("design:type", Array)
], ServicePrice.prototype, "type", void 0);
exports.ServicePrice = ServicePrice = __decorate([
    (0, typeorm_1.Entity)('service_price')
], ServicePrice);
//# sourceMappingURL=service.entity.js.map