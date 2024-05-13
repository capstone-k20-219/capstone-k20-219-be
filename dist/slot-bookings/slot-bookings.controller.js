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
exports.SlotBookingsController = void 0;
const common_1 = require("@nestjs/common");
const slot_bookings_service_1 = require("./slot-bookings.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const slot_booking_dto_1 = require("./dtos/slot-booking.dto");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const parking_slots_service_1 = require("../parking-slots/parking-slots.service");
const parking_tickets_service_1 = require("../parking-tickets/parking-tickets.service");
const typeorm_1 = require("typeorm");
let SlotBookingsController = class SlotBookingsController {
    constructor(slotBookingsService, vehiclesService, slotsService, ticketsService) {
        this.slotBookingsService = slotBookingsService;
        this.vehiclesService = vehiclesService;
        this.slotsService = slotsService;
        this.ticketsService = ticketsService;
    }
    async create(request, bookingDto, res) {
        try {
            const { id: userId } = request['user'];
            const vehicle = await this.vehiclesService.getById(bookingDto.vehicleId);
            if (vehicle.userId != userId) {
                return res.status(403).send('Forbidden');
            }
            const currentTime = new Date();
            let arrivalTime = new Date(bookingDto.arrivalTime);
            let timeGap = (arrivalTime.getTime() - currentTime.getTime()) / 1000;
            if (timeGap > 86400 || timeGap <= 1800) {
                return res
                    .status(400)
                    .send('Inappropriate arrival time (must be no later than 24 hours and no earlier than 30 minutes from now');
            }
            const slotType = await this.slotsService.getById(bookingDto.slotId);
            if (slotType.typeId != vehicle.typeId) {
                return res
                    .status(400)
                    .send(`Vehicle not appropriate at slot ${bookingDto.slotId}`);
            }
            const ticket = await this.ticketsService.findOne({
                where: { slotId: bookingDto.slotId, checkOutTime: null },
            });
            const reserve = await this.slotBookingsService.findOne({
                where: {
                    slotId: bookingDto.slotId,
                    arrivalTime: (0, typeorm_1.MoreThan)(currentTime),
                },
            });
            if (ticket || reserve) {
                return res
                    .status(400)
                    .send(`Slot ${bookingDto.slotId} is either reserved or occupied`);
            }
            arrivalTime = new Date(arrivalTime.getTime() + 30 * 60000);
            const bookingInfo = { ...bookingDto, arrivalTime: arrivalTime };
            const result = await this.slotBookingsService.create(bookingInfo);
            return res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
    async cancelBooking(request, id, res) {
        try {
            const { id: userId } = request['user'];
            const booking = await this.slotBookingsService.findOne({
                select: { vehicle: { userId: true } },
                where: { id: id },
                relations: { vehicle: true },
            });
            if (booking.vehicle.userId != userId) {
                return res.status(403).send('Forbidden');
            }
            const result = await this.slotBookingsService.remove(id);
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
};
exports.SlotBookingsController = SlotBookingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        slot_booking_dto_1.CreateSlotBookingDto, Object]),
    __metadata("design:returntype", Promise)
], SlotBookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number, Object]),
    __metadata("design:returntype", Promise)
], SlotBookingsController.prototype, "cancelBooking", null);
exports.SlotBookingsController = SlotBookingsController = __decorate([
    (0, common_1.Controller)('slot-bookings'),
    (0, swagger_1.ApiTags)('Slot bookings'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [slot_bookings_service_1.SlotBookingsService,
        vehicles_service_1.VehiclesService,
        parking_slots_service_1.ParkingSlotsService,
        parking_tickets_service_1.ParkingTicketsService])
], SlotBookingsController);
//# sourceMappingURL=slot-bookings.controller.js.map