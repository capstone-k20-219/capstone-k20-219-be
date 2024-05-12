import { VehicleTypesService } from './vehicle-types.service';
import { CreateVehicleTypeRequestDto, GetVehicleTypeRequestDto, UpdateVehicleTypeRequestDto } from './dtos/vehicle-type.dto';
import { Response } from 'express';
export declare class VehicleTypesController {
    private readonly vehicleTypesService;
    constructor(vehicleTypesService: VehicleTypesService);
    create(type: CreateVehicleTypeRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(filter: GetVehicleTypeRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(updateVehicleTypeDto: UpdateVehicleTypeRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
