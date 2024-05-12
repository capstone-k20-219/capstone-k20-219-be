import { SlotBookingsService } from './slot-bookings.service';
import { CreateSlotBookingDto } from './dtos/slot-booking.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
import { ParkingSlotsService } from '../parking-slots/parking-slots.service';
import { ParkingTicketsService } from '../parking-tickets/parking-tickets.service';
import { Response } from 'express';
export declare class SlotBookingsController {
    private readonly slotBookingsService;
    private readonly vehiclesService;
    private readonly slotsService;
    private readonly ticketsService;
    constructor(slotBookingsService: SlotBookingsService, vehiclesService: VehiclesService, slotsService: ParkingSlotsService, ticketsService: ParkingTicketsService);
    create(request: Request, bookingDto: CreateSlotBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelBooking(request: Request, id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
