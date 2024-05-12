import { Logger } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, GetServiceDto, UpdateServiceDto } from './dtos/services.request.dto';
import { Response } from 'express';
export declare class ServicesController {
    private readonly servicesService;
    logger: Logger;
    constructor(servicesService: ServicesService);
    create(service: CreateServiceDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findByFilter(query: GetServiceDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(updateServiceDto: UpdateServiceDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
