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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingsController = void 0;
const common_1 = require("@nestjs/common");
const service_bookings_service_1 = require("./service-bookings.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const service_booking_dto_1 = require("./dtos/service-booking.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const parking_tickets_service_1 = require("../parking-tickets/parking-tickets.service");
const services_service_1 = require("../services/services.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const typeorm_1 = require("typeorm");
let ServiceBookingsController = class ServiceBookingsController {
    constructor(serviceBookingsService, parkingTicketsService, servicesService, vehiclesService) {
        this.serviceBookingsService = serviceBookingsService;
        this.parkingTicketsService = parkingTicketsService;
        this.servicesService = servicesService;
        this.vehiclesService = vehiclesService;
    }
    async create(request, bookingDto, res) {
        try {
            const { id: userId } = request['user'];
            const ticket = await this.parkingTicketsService.getById(bookingDto.ticketId);
            if (!ticket) {
                return res.status(400).send('ticket_not_existed');
            }
            if (ticket.userId != userId) {
                return res.status(403).send('Forbidden');
            }
            const bookingInfo = { ...bookingDto };
            const result = await this.serviceBookingsService.create(bookingInfo);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getPendingServiceBooking(serviceId, res) {
        try {
            const result = await this.serviceBookingsService.find({
                select: {
                    id: true,
                    createdAt: true,
                    ticket: { id: true, slotId: true, plateNo: true },
                },
                where: {
                    serviceId: serviceId,
                    isDone: false,
                    ticket: { checkOutTime: (0, typeorm_1.IsNull)() },
                },
                relations: { ticket: true },
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async updateServiceBookingStatus(updateTicketDto, res) {
        try {
            const booking = await this.serviceBookingsService.findOne({
                select: { id: true, serviceId: true, ticket: { plateNo: true } },
                where: { id: updateTicketDto.id },
                relations: { ticket: true },
            });
            const service = await this.servicesService.findOne({
                where: { id: booking.serviceId },
                relations: { prices: true },
            });
            const vehicle = await this.vehiclesService.findOne({
                select: ['typeId'],
                where: { plateNo: booking.ticket.plateNo },
            });
            const unitPrice = service.prices.filter((item) => item.typeId === vehicle.typeId)[0].unitPrice;
            const cost = updateTicketDto.quantity * unitPrice;
            const updateInfo = { ...updateTicketDto, cost };
            const result = await this.serviceBookingsService.update(updateTicketDto.id, updateInfo);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async cancelBooking(id, res) {
        try {
            const result = await this.serviceBookingsService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.ServiceBookingsController = ServiceBookingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        service_booking_dto_1.CreateServiceBookingDto, Object]),
    __metadata("design:returntype", Promise)
], ServiceBookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('service/pending/:serviceId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Param)('serviceId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiceBookingsController.prototype, "getPendingServiceBooking", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_booking_dto_1.UpdateServiceBookingDto, Object]),
    __metadata("design:returntype", Promise)
], ServiceBookingsController.prototype, "updateServiceBookingStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServiceBookingsController.prototype, "cancelBooking", null);
exports.ServiceBookingsController = ServiceBookingsController = __decorate([
    (0, common_1.Controller)('service-bookings'),
    (0, swagger_1.ApiTags)('Service bookings'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [service_bookings_service_1.ServiceBookingsService,
        parking_tickets_service_1.ParkingTicketsService,
        services_service_1.ServicesService,
        vehicles_service_1.VehiclesService])
], ServiceBookingsController);
//# sourceMappingURL=service-bookings.controller.js.map