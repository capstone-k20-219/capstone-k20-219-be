import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import {
  CreateVehicleTypeRequestDto,
  UpdateVehicleTypeRequestDto,
} from './dtos/vehicle-type.dto';
import { VehicleType } from './entities/vehicle-type.entity';

@Controller('vehicle-types')
@ApiTags('VehicleTypes')
@UseGuards(AuthGuard)
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(
    @Body() type: CreateVehicleTypeRequestDto,
  ): Promise<VehicleType> {
    const isDuplicate = await this.vehicleTypesService.getById(type.id);
    if (isDuplicate) {
      throw new BadRequestException('typeId_existed');
    }
    type.id = type.id.toUpperCase();
    return await this.vehicleTypesService.create(type);
  }

  @Get()
  async getAll(): Promise<VehicleType[]> {
    const types = await this.vehicleTypesService.find({
      select: ['id', 'name', 'parkingFee', 'slotBookingFee'],
    });
    return types;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateVehicleTypeDto: UpdateVehicleTypeRequestDto) {
    const result = await this.vehicleTypesService.update(
      updateVehicleTypeDto.id,
      updateVehicleTypeDto,
    );
    return result;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('id') id: string) {
    const result = this.vehicleTypesService.remove(id);
    return result;
  }
}
