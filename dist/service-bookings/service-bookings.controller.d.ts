import { ServiceBookingsService } from './service-bookings.service';
import { CreateServiceBookingDto, UpdateServiceBookingDto } from './dtos/service-booking.dto';
import { ParkingTicketsService } from '../parking-tickets/parking-tickets.service';
import { ServicesService } from '../services/services.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Response } from 'express';
export declare class ServiceBookingsController {
    private readonly serviceBookingsService;
    private readonly parkingTicketsService;
    private readonly servicesService;
    private readonly vehiclesService;
    constructor(serviceBookingsService: ServiceBookingsService, parkingTicketsService: ParkingTicketsService, servicesService: ServicesService, vehiclesService: VehiclesService);
    create(request: Request, bookingDto: CreateServiceBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getPendingServiceBooking(serviceId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateServiceBookingStatus(updateTicketDto: UpdateServiceBookingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelBooking(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
