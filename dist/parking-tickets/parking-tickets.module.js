"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingTicketsModule = void 0;
const common_1 = require("@nestjs/common");
const parking_tickets_service_1 = require("./parking-tickets.service");
const parking_tickets_controller_1 = require("./parking-tickets.controller");
const parking_ticket_entity_1 = require("./entities/parking-ticket.entity");
const typeorm_1 = require("@nestjs/typeorm");
const slot_bookings_module_1 = require("../slot-bookings/slot-bookings.module");
const vehicle_types_module_1 = require("../vehicle-types/vehicle-types.module");
const vehicles_module_1 = require("../vehicles/vehicles.module");
const parking_slots_module_1 = require("../parking-slots/parking-slots.module");
let ParkingTicketsModule = class ParkingTicketsModule {
};
exports.ParkingTicketsModule = ParkingTicketsModule;
exports.ParkingTicketsModule = ParkingTicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([parking_ticket_entity_1.ParkingTicket]),
            vehicle_types_module_1.VehicleTypesModule,
            vehicles_module_1.VehiclesModule,
            parking_slots_module_1.ParkingSlotsModule,
            (0, common_1.forwardRef)(() => slot_bookings_module_1.SlotBookingsModule),
        ],
        controllers: [parking_tickets_controller_1.ParkingTicketsController],
        providers: [parking_tickets_service_1.ParkingTicketsService],
        exports: [parking_tickets_service_1.ParkingTicketsService],
    })
], ParkingTicketsModule);
//# sourceMappingURL=parking-tickets.module.js.map