"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotBookingsModule = void 0;
const common_1 = require("@nestjs/common");
const slot_bookings_service_1 = require("./slot-bookings.service");
const slot_bookings_controller_1 = require("./slot-bookings.controller");
const slot_booking_entity_1 = require("./entities/slot-booking.entity");
const typeorm_1 = require("@nestjs/typeorm");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const parking_slots_module_1 = require("../parking-slots/parking-slots.module");
const parking_tickets_module_1 = require("../parking-tickets/parking-tickets.module");
let SlotBookingsModule = class SlotBookingsModule {
};
exports.SlotBookingsModule = SlotBookingsModule;
exports.SlotBookingsModule = SlotBookingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([slot_booking_entity_1.SlotBooking]),
            vehicles_module_1.VehiclesModule,
            parking_slots_module_1.ParkingSlotsModule,
            (0, common_1.forwardRef)(() => parking_tickets_module_1.ParkingTicketsModule),
        ],
        controllers: [slot_bookings_controller_1.SlotBookingsController],
        providers: [slot_bookings_service_1.SlotBookingsService],
        exports: [slot_bookings_service_1.SlotBookingsService],
    })
], SlotBookingsModule);
//# sourceMappingURL=slot-bookings.module.js.map