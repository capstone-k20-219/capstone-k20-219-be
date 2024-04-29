import { Test, TestingModule } from '@nestjs/testing';
import { SlotBookingsController } from './slot-bookings.controller';
import { SlotBookingsService } from './slot-bookings.service';

describe('SlotBookingsController', () => {
  let controller: SlotBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotBookingsController],
      providers: [SlotBookingsService],
    }).compile();

    controller = module.get<SlotBookingsController>(SlotBookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
