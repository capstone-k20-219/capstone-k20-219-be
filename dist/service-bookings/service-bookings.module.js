"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingsModule = void 0;
const common_1 = require("@nestjs/common");
const service_bookings_service_1 = require("./service-bookings.service");
const service_bookings_controller_1 = require("./service-bookings.controller");
const service_booking_entity_1 = require("./entities/service-booking.entity");
const typeorm_1 = require("@nestjs/typeorm");
const parking_tickets_module_1 = require("../parking-tickets/parking-tickets.module");
const services_module_1 = require("../services/services.module");
const vehicles_module_1 = require("../vehicles/vehicles.module");
let ServiceBookingsModule = class ServiceBookingsModule {
};
exports.ServiceBookingsModule = ServiceBookingsModule;
exports.ServiceBookingsModule = ServiceBookingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([service_booking_entity_1.ServiceBooking]),
            parking_tickets_module_1.ParkingTicketsModule,
            services_module_1.ServicesModule,
            vehicles_module_1.VehiclesModule,
        ],
        controllers: [service_bookings_controller_1.ServiceBookingsController],
        providers: [service_bookings_service_1.ServiceBookingsService],
        exports: [service_bookings_service_1.ServiceBookingsService],
    })
], ServiceBookingsModule);
//# sourceMappingURL=service-bookings.module.js.map