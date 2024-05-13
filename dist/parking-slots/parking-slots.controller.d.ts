import { Logger } from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { CreateParkingSlotDto, GetParkingSlotDto, UpdateParkingSlotDto, UpsertParkingSlotDto } from './dtos/parking-slot.dto';
import { Response } from 'express';
export declare class ParkingSlotsController {
    private readonly parkingSlotsService;
    logger: Logger;
    constructor(parkingSlotsService: ParkingSlotsService);
    create(parkingSlot: CreateParkingSlotDto, res: Response): Promise<Response<any, Record<string, any>>>;
    upsert(upsertDto: UpsertParkingSlotDto, res: Response): Promise<void>;
    findByFilter(filter: GetParkingSlotDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(updateParkingSlotDto: UpdateParkingSlotDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
