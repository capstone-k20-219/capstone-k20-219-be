import { Logger } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleRequestDto, GetVehicleRequestDto, UpdateVehicleRequestDto } from './dtos/vehicle.dto';
import { Response } from 'express';
export declare class VehiclesController {
    private readonly vehiclesService;
    logger: Logger;
    constructor(vehiclesService: VehiclesService);
    create(request: Request, vehicle: CreateVehicleRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findMyVehicles(request: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findOneByFilter(filter: GetVehicleRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, updateVehicleDto: UpdateVehicleRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
