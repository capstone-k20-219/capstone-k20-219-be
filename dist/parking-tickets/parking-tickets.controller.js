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
exports.ParkingTicketsController = void 0;
const common_1 = require("@nestjs/common");
const parking_tickets_service_1 = require("./parking-tickets.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const parking_ticket_request_dto_1 = require("./dtos/parking-ticket.request.dto");
const slot_bookings_service_1 = require("../slot-bookings/slot-bookings.service");
const typeorm_1 = require("typeorm");
const getDateString_1 = require("../shared/helpers/getDateString");
const idGenerator_1 = require("../shared/helpers/idGenerator");
const vehicle_types_service_1 = require("../vehicle-types/vehicle-types.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const parking_slots_service_1 = require("../parking-slots/parking-slots.service");
let ParkingTicketsController = class ParkingTicketsController {
    constructor(ticketsService, slotBookingsService, vehicleTypesService, vehiclesService, slotsService) {
        this.ticketsService = ticketsService;
        this.slotBookingsService = slotBookingsService;
        this.vehicleTypesService = vehicleTypesService;
        this.vehiclesService = vehiclesService;
        this.slotsService = slotsService;
    }
    async checkIn(checkInInfo, res) {
        try {
            const vehicle = await this.vehiclesService.findOne({
                select: ['id', 'userId', 'plateNo', 'typeId'],
                where: { plateNo: checkInInfo.plateNo },
            });
            if (!vehicle) {
                return res.status(400).send('vehicle not registered');
            }
            const isParking = await this.ticketsService.findOne({
                where: {
                    plateNo: vehicle.plateNo,
                    userId: vehicle.userId,
                    checkOutTime: (0, typeorm_1.IsNull)(),
                },
            });
            if (isParking) {
                return res.status(400).send('vehicle already checked in');
            }
            const currentTime = new Date();
            const slotBooking = await this.slotBookingsService.findOne({
                where: {
                    vehicle: { plateNo: checkInInfo.plateNo },
                    arrivalTime: (0, typeorm_1.MoreThanOrEqual)(currentTime),
                },
            });
            let slotId = '';
            if (slotBooking) {
                slotId = slotBooking.slotId;
            }
            else {
                const slots = await this.slotsService.find({
                    select: ['id'],
                    where: { typeId: vehicle.typeId },
                    order: { id: 'ASC' },
                });
                const slotIds = slots.map((item) => item.id);
                const occupiedSlots = await this.slotsService.find({
                    select: ['id'],
                    where: {
                        typeId: vehicle.typeId,
                        tickets: { createdAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()), checkOutTime: (0, typeorm_1.IsNull)() },
                    },
                    order: { id: 'ASC' },
                });
                const bookedSlots = await this.slotsService.find({
                    select: ['id'],
                    where: {
                        typeId: vehicle.typeId,
                        bookings: { arrivalTime: (0, typeorm_1.MoreThanOrEqual)(currentTime) },
                    },
                    order: { id: 'ASC' },
                });
                const unavailSlotIds = Array.from(new Set([
                    ...occupiedSlots.map((item) => item.id),
                    ...bookedSlots.map((item) => item.id),
                ]));
                for (const id of slotIds) {
                    if (!unavailSlotIds.includes(id)) {
                        slotId = id;
                        break;
                    }
                }
                if (slotId == '') {
                    return res.status(400).send('no available slot');
                }
            }
            let id = (0, getDateString_1.getDateString)();
            const latest = await this.ticketsService.find({
                where: { id: (0, typeorm_1.Like)(`${id}%`) },
                skip: 0,
                take: 1,
                order: { createdAt: 'DESC' },
            });
            let number = 1;
            if (latest.length)
                number = Number(latest[0].id.substring(9)) + 1;
            id = (0, idGenerator_1.idGenerator)(4, number, `${id}-`);
            const ticket = {
                id: id,
                slotId: slotId,
                plateNo: checkInInfo.plateNo,
                userId: vehicle.userId,
            };
            const result = await this.ticketsService.create(ticket);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findMyTickets(req, res) {
        try {
            const { id: userId } = req['user'];
            const cond = { where: { userId: userId, checkOutTime: (0, typeorm_1.IsNull)() } };
            const result = await this.ticketsService.find(cond);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async findAll(res) {
        try {
            const result = await this.ticketsService.find({
                where: { checkOutTime: (0, typeorm_1.IsNull)() },
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async checkOut(checkOutDto, res) {
        try {
            const ticket = await this.ticketsService.findOne({
                where: { id: checkOutDto.id },
                relations: { slot: true, serviceBookings: { service: true } },
            });
            if (ticket.checkOutTime)
                return res.status(400).send('ticket already checked out');
            if (ticket.plateNo !== checkOutDto.plateNo) {
                return res.status(400).send('incorrect_plate');
            }
            const checkOutTime = new Date();
            const parkingDuration = Math.ceil((checkOutTime.getTime() - ticket.createdAt.getTime()) / 3600000);
            const vehicleType = await this.vehicleTypesService.findOne({
                select: ['id', 'parkingFee'],
                where: { id: ticket.slot.typeId },
            });
            const parkingCost = parkingDuration * vehicleType.parkingFee;
            const invoice = {
                ticketId: ticket.id,
                plateNo: checkOutDto.plateNo,
                checkInTime: ticket.createdAt,
                checkoutTime: checkOutTime,
                slotId: ticket.slotId,
                parkingCost: parkingCost,
                services: ticket.serviceBookings.map((item) => {
                    return {
                        serviceId: item.serviceId,
                        name: item.service.name,
                        quantity: item.quantity,
                        cost: item.cost,
                    };
                }),
            };
            await this.ticketsService.update(ticket.id, {
                checkOutTime: checkOutTime,
                parkingCost: parkingCost,
            });
            return res.status(200).send(invoice);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async updateTicketPaidStatus(updateDto, res) {
        try {
            const result = await this.ticketsService.update(updateDto.id, {
                isPaid: updateDto.isPaid,
            });
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getMyHistory(req, filter, res) {
        try {
            const { id: userId } = req['user'];
            const cond = {
                select: [
                    'id',
                    'plateNo',
                    'createdAt',
                    'checkOutTime',
                    'slotId',
                    'parkingCost',
                ],
                where: { userId: userId, isPaid: true, checkOutTime: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
            };
            const timeCond = [(0, typeorm_1.Not)((0, typeorm_1.IsNull)())];
            if (filter.fromDate) {
                timeCond.push((0, typeorm_1.MoreThanOrEqual)(new Date(filter.fromDate)));
            }
            if (filter.toDate) {
                timeCond.push((0, typeorm_1.LessThanOrEqual)(new Date(filter.toDate)));
            }
            cond['where']['checkOutTime'] = (0, typeorm_1.And)(...timeCond);
            const tickets = await this.ticketsService.find(cond);
            const result = tickets.map((ticket) => {
                return {
                    ticketId: ticket.id,
                    plateNo: ticket.plateNo,
                    checkInTime: ticket.createdAt,
                    checkOutTime: ticket.checkOutTime,
                    slotId: ticket.slotId,
                    parkingCost: ticket.parkingCost,
                };
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getHistoryForEmployee(filter, res) {
        try {
            const cond = {
                select: [
                    'id',
                    'plateNo',
                    'createdAt',
                    'checkOutTime',
                    'slotId',
                    'parkingCost',
                ],
                where: { isPaid: true },
                relations: { serviceBookings: { service: true } },
            };
            if (filter.serviceId) {
                cond['where']['serviceBookings'] = { serviceId: filter.serviceId };
            }
            const timeCond = [(0, typeorm_1.Not)((0, typeorm_1.IsNull)())];
            if (filter.fromDate) {
                timeCond.push((0, typeorm_1.MoreThanOrEqual)(new Date(filter.fromDate)));
            }
            if (filter.toDate) {
                timeCond.push((0, typeorm_1.LessThanOrEqual)(new Date(filter.toDate)));
            }
            cond['where']['checkOutTime'] = (0, typeorm_1.And)(...timeCond);
            const tickets = await this.ticketsService.find(cond);
            const result = tickets.map((ticket) => {
                return {
                    ticketId: ticket.id,
                    plateNo: ticket.plateNo,
                    checkInTime: ticket.createdAt,
                    checkOutTime: ticket.checkOutTime,
                    slotId: ticket.slotId,
                    parkingCost: ticket.parkingCost,
                    services: ticket.serviceBookings.map((item) => {
                        return {
                            serviceId: item.serviceId,
                            name: item.service.name,
                            quantity: item.quantity,
                            cost: item.cost,
                        };
                    }),
                };
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getTicketDetails(id, req, res) {
        try {
            const { id: userId, roles } = req['user'];
            const cond = {
                where: { id: id, isPaid: true, checkOutTime: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                relations: { slot: true, serviceBookings: { service: true } },
            };
            if (!roles.includes('manager') || !roles.includes('employee')) {
                cond.where['userId'] = userId;
            }
            const ticket = await this.ticketsService.findOne(cond);
            if (!ticket) {
                return res.status(400).send('Ticket not found');
            }
            const result = {
                ticketId: ticket.id,
                plateNo: ticket.plateNo,
                chcekInTime: ticket.createdAt,
                checkOutTime: ticket.checkOutTime,
                slotId: ticket.slotId,
                parkingCost: ticket.parkingCost,
                services: ticket.serviceBookings.map((booking) => {
                    return {
                        serviceId: booking.serviceId,
                        name: booking.service.name,
                        quantity: booking.quantity,
                        cost: booking.cost,
                    };
                }),
            };
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async getCheckInHistoryForEmployee(filter, res) {
        try {
            const cond = {
                select: [
                    'id',
                    'plateNo',
                    'createdAt',
                    'checkOutTime',
                    'slotId',
                    'parkingCost',
                ],
            };
            const timeCond = [];
            if (filter.fromDate) {
                timeCond.push((0, typeorm_1.MoreThanOrEqual)(new Date(filter.fromDate)));
            }
            if (filter.toDate) {
                timeCond.push((0, typeorm_1.LessThanOrEqual)(new Date(filter.toDate)));
            }
            cond['where'] = { createdAt: (0, typeorm_1.And)(...timeCond) };
            const tickets = await this.ticketsService.find(cond);
            const result = tickets.map((ticket) => {
                return {
                    ticketId: ticket.id,
                    plateNo: ticket.plateNo,
                    checkInTime: ticket.createdAt,
                    checkOutTime: ticket.checkOutTime,
                    slotId: ticket.slotId,
                    parkingCost: ticket.parkingCost,
                };
            });
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.ParkingTicketsController = ParkingTicketsController;
__decorate([
    (0, common_1.Post)('check-in'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_ticket_request_dto_1.CreateParkingTicketDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "findMyTickets", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('check-out'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_ticket_request_dto_1.CheckOutDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Put)('/updateTicketPaidStatus'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_ticket_request_dto_1.UpdateTicketPaidStatusDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "updateTicketPaidStatus", null);
__decorate([
    (0, common_1.Get)('/history/my'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        parking_ticket_request_dto_1.GetParkingTicketDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "getMyHistory", null);
__decorate([
    (0, common_1.Get)('/history/all'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_ticket_request_dto_1.GetParkingTicketDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "getHistoryForEmployee", null);
__decorate([
    (0, common_1.Get)('/history/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "getTicketDetails", null);
__decorate([
    (0, common_1.Get)('/history/checkIn'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRoleEnum.MANAGER, user_role_enum_1.UserRoleEnum.EMPLOYEE),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parking_ticket_request_dto_1.GetParkingTicketDto, Object]),
    __metadata("design:returntype", Promise)
], ParkingTicketsController.prototype, "getCheckInHistoryForEmployee", null);
exports.ParkingTicketsController = ParkingTicketsController = __decorate([
    (0, common_1.Controller)('parking-tickets'),
    (0, swagger_1.ApiTags)('Parking tickets'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [parking_tickets_service_1.ParkingTicketsService,
        slot_bookings_service_1.SlotBookingsService,
        vehicle_types_service_1.VehicleTypesService,
        vehicles_service_1.VehiclesService,
        parking_slots_service_1.ParkingSlotsService])
], ParkingTicketsController);
//# sourceMappingURL=parking-tickets.controller.js.map