"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./users/user.module");
const global_module_1 = require("./shared/modules/global.module");
const auth_module_1 = require("./auth/auth.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const vehicle_types_module_1 = require("./vehicle-types/vehicle-types.module");
const comments_module_1 = require("./comments/comments.module");
const parking_slots_module_1 = require("./parking-slots/parking-slots.module");
const services_module_1 = require("./services/services.module");
const parking_tickets_module_1 = require("./parking-tickets/parking-tickets.module");
const service_bookings_module_1 = require("./service-bookings/service-bookings.module");
const slot_bookings_module_1 = require("./slot-bookings/slot-bookings.module");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_SCHEMA,
                autoLoadEntities: true,
                synchronize: true,
            }),
            global_module_1.GlobalModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            vehicles_module_1.VehiclesModule,
            vehicle_types_module_1.VehicleTypesModule,
            comments_module_1.CommentsModule,
            parking_slots_module_1.ParkingSlotsModule,
            services_module_1.ServicesModule,
            parking_tickets_module_1.ParkingTicketsModule,
            service_bookings_module_1.ServiceBookingsModule,
            slot_bookings_module_1.SlotBookingsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map