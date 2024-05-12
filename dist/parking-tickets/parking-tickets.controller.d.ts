import { ParkingTicketsService } from './parking-tickets.service';
import { CheckOutDto, CreateParkingTicketDto, GetParkingTicketDto, UpdateTicketPaidStatusDto } from './dtos/parking-ticket.request.dto';
import { SlotBookingsService } from '../slot-bookings/slot-bookings.service';
import { Response } from 'express';
import { VehicleTypesService } from '../vehicle-types/vehicle-types.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { ParkingSlotsService } from '../parking-slots/parking-slots.service';
export declare class ParkingTicketsController {
    private readonly ticketsService;
    private readonly slotBookingsService;
    private readonly vehicleTypesService;
    private readonly vehiclesService;
    private readonly slotsService;
    constructor(ticketsService: ParkingTicketsService, slotBookingsService: SlotBookingsService, vehicleTypesService: VehicleTypesService, vehiclesService: VehiclesService, slotsService: ParkingSlotsService);
    checkIn(checkInInfo: CreateParkingTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findMyTickets(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    checkOut(checkOutDto: CheckOutDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTicketPaidStatus(updateDto: UpdateTicketPaidStatusDto, res: Response): Promise<void>;
    getMyHistory(req: Request, filter: GetParkingTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getHistoryForEmployee(filter: GetParkingTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getTicketDetails(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCheckInHistoryForEmployee(filter: GetParkingTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
