import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotsService } from './parking-slots.service';

describe('ParkingSlotsService', () => {
  let service: ParkingSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSlotsService],
    }).compile();

    service = module.get<ParkingSlotsService>(ParkingSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
