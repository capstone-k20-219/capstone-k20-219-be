import { Test, TestingModule } from '@nestjs/testing';
import { SlotBookingsService } from './slot-bookings.service';

describe('SlotBookingsService', () => {
  let service: SlotBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotBookingsService],
    }).compile();

    service = module.get<SlotBookingsService>(SlotBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
