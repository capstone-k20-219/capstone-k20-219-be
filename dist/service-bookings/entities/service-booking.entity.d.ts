import { Base } from '../../shared/entities/base.entity';
import { ParkingTicket } from '../../parking-tickets/entities/parking-ticket.entity';
import { Service } from '../../services/entities/service.entity';
export declare class ServiceBooking extends Base {
    id: number;
    ticketId: string;
    serviceId: string;
    quantity: number;
    cost: number;
    isDone: boolean;
    ticket: ParkingTicket;
    service: Service;
}
