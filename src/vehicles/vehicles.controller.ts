import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateVehicleRequestDto,
  UpdateVehicleRequestDto,
} from './dtos/vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Controller('vehicles')
@ApiTags('Vehicles')
@UseGuards(AuthGuard)
export class VehiclesController {
  logger: Logger;
  constructor(private readonly vehiclesService: VehiclesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Req() request: Request,
    @Body() vehicle: CreateVehicleRequestDto,
  ): Promise<Vehicle> {
    const { id: userId } = request['user'];
    const isDuplicate = await this.vehiclesService.findOne({
      where: { plateNo: vehicle.plateNo },
    });
    if (isDuplicate) {
      throw new BadRequestException('vehicle_existed');
    }
    return await this.vehiclesService.create({ userId: userId, ...vehicle });
  }

  @Get()
  async findMyVehicles(@Req() request: Request): Promise<Vehicle[]> {
    const { id: userId } = request['user'];
    const vehicles = await this.vehiclesService.find({
      select: {
        id: true,
        plateNo: true,
        description: true,
        userId: true,
        type: { id: true, name: true },
      },
      where: { userId: userId },
      relations: { type: true },
    });
    return vehicles;
  }

  @Put()
  async update(
    @Req() request: Request,
    @Body() updateVehicleDto: UpdateVehicleRequestDto,
  ) {
    const user = request['user'];
    const vehicle = await this.vehiclesService.getById(updateVehicleDto.id);

    if (!vehicle) {
      throw new BadRequestException('vehicle_not_existed');
    }

    if (!user.roles.includes('manager') && user.id != vehicle.userId) {
      throw new UnauthorizedException();
    }

    const result = await this.vehiclesService.update(
      updateVehicleDto.id,
      updateVehicleDto,
    );
    return result;
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param('id') id: string) {
    const user = request['user'];
    const vehicle = await this.vehiclesService.getById(id);

    if (!vehicle) {
      throw new BadRequestException('vehicle_not_existed');
    }

    if (!user.roles.includes('manager') && user.id != vehicle.userId) {
      throw new UnauthorizedException();
    }

    const result = await this.vehiclesService.remove(id);
    return result;
  }
}
