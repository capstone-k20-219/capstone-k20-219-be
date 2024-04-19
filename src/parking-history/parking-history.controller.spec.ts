import { Test, TestingModule } from '@nestjs/testing';
import { ParkingHistoryController } from './parking-history.controller';
import { ParkingHistoryService } from './parking-history.service';

describe('ParkingHistoryController', () => {
  let controller: ParkingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingHistoryController],
      providers: [ParkingHistoryService],
    }).compile();

    controller = module.get<ParkingHistoryController>(ParkingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
