import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingTicketsService extends BaseService<ParkingTicket> {
  constructor(
    @InjectRepository(ParkingTicket)
    private readonly _parkingTicketRepo: Repository<ParkingTicket>,
  ) {
    super(_parkingTicketRepo, 'parking_ticket');
  }
}
