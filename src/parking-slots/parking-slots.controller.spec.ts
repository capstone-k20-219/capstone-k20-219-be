import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotsController } from './parking-slots.controller';
import { ParkingSlotsService } from './parking-slots.service';

describe('ParkingSlotsController', () => {
  let controller: ParkingSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSlotsController],
      providers: [ParkingSlotsService],
    }).compile();

    controller = module.get<ParkingSlotsController>(ParkingSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
