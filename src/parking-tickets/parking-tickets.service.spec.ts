import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTicketsService } from './parking-tickets.service';

describe('ParkingTicketsService', () => {
  let service: ParkingTicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingTicketsService],
    }).compile();

    service = module.get<ParkingTicketsService>(ParkingTicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
