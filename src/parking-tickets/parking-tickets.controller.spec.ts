import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTicketsController } from './parking-tickets.controller';
import { ParkingTicketsService } from './parking-tickets.service';

describe('ParkingTicketsController', () => {
  let controller: ParkingTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingTicketsController],
      providers: [ParkingTicketsService],
    }).compile();

    controller = module.get<ParkingTicketsController>(ParkingTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
