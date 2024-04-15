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
import { VehicleEntity } from './entities/vehicle.entity';

@Controller('vehicles')
@ApiTags('Vehicles')
@UseGuards(AuthGuard)
export class VehiclesController {
  logger: Logger;
  constructor(private readonly vehiclesService: VehiclesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() vehicle: CreateVehicleRequestDto,
  ): Promise<VehicleEntity> {
    const isDuplicate = await this.vehiclesService.findOne({
      plate_no: vehicle.plate_no,
    });
    if (isDuplicate) {
      throw new BadRequestException('vehicle_existed');
    }
    return await this.vehiclesService.create(vehicle);
  }

  @Get()
  async findMyVehicles(@Req() request: Request): Promise<VehicleEntity[]> {
    const user_id = request['user']._id;
    const vehicles = await this.vehiclesService.find({ user_id: user_id });
    return vehicles;
  }

  @Put()
  async update(
    @Req() request: Request,
    @Body() updateVehicleDto: UpdateVehicleRequestDto,
  ) {
    const user = request['user'];
    const vehicle = await this.vehiclesService.findOne({
      plate_no: updateVehicleDto.plate_no,
    });

    if (!vehicle) {
      throw new BadRequestException('vehicle_not_existed');
    }

    if (!user.role.includes('manager') && user._id != vehicle.user_id) {
      throw new UnauthorizedException();
    }

    const result = await this.vehiclesService.findOneAndUpdate(
      { plate_no: updateVehicleDto.plate_no },
      updateVehicleDto,
    );
    return result;
  }

  @Delete(':_id')
  async delete(@Req() request: Request, @Param('_id') _id: string) {
    const user = request['user'];
    const vehicle = await this.vehiclesService.findOne({ _id: _id });

    if (!vehicle) {
      throw new BadRequestException('vehicle_not_existed');
    }

    if (!user.role.includes('manager') && user._id != vehicle.user_id) {
      throw new UnauthorizedException();
    }

    const result = await this.vehiclesService.removeByConditions({ _id: _id });
    return result;
  }
}
