"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTypesModule = void 0;
const common_1 = require("@nestjs/common");
const vehicle_types_service_1 = require("./vehicle-types.service");
const vehicle_type_entity_1 = require("./entities/vehicle-type.entity");
const vehicle_types_controller_1 = require("./vehicle-types.controller");
const typeorm_1 = require("@nestjs/typeorm");
let VehicleTypesModule = class VehicleTypesModule {
};
exports.VehicleTypesModule = VehicleTypesModule;
exports.VehicleTypesModule = VehicleTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vehicle_type_entity_1.VehicleType])],
        controllers: [vehicle_types_controller_1.VehicleTypesController],
        providers: [vehicle_types_service_1.VehicleTypesService],
        exports: [vehicle_types_service_1.VehicleTypesService],
    })
], VehicleTypesModule);
//# sourceMappingURL=vehicle-types.module.js.map