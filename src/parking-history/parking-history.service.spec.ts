import { Test, TestingModule } from '@nestjs/testing';
import { ParkingHistoryService } from './parking-history.service';

describe('ParkingHistoryService', () => {
  let service: ParkingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingHistoryService],
    }).compile();

    service = module.get<ParkingHistoryService>(ParkingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
