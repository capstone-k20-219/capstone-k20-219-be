import { BaseService } from '../shared/services/base.service';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { Repository } from 'typeorm';
export declare class ParkingTicketsService extends BaseService<ParkingTicket> {
    private readonly _parkingTicketRepo;
    constructor(_parkingTicketRepo: Repository<ParkingTicket>);
}
