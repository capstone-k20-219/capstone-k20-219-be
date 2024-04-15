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
import { VehicleTypeEntity } from './entities/vehicle-type.entity';

@Controller('vehicles')
@ApiTags('VehicleTypes')
@UseGuards(AuthGuard)
export class VehicleTypesController {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(
    @Body() type: CreateVehicleTypeRequestDto,
  ): Promise<VehicleTypeEntity> {
    const isDuplicate = await this.vehicleTypesService.findOne({
      code: type.code,
    });
    if (isDuplicate) {
      throw new BadRequestException('code_existed');
    }
    return await this.vehicleTypesService.create(type);
  }

  @Get()
  async getAll(): Promise<VehicleTypeEntity[]> {
    const types = await this.vehicleTypesService.findAll();
    return types;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateVehicleTypeDto: UpdateVehicleTypeRequestDto) {
    const result = await this.vehicleTypesService.findOneAndUpdate(
      { code: updateVehicleTypeDto.code },
      { type: updateVehicleTypeDto.type },
    );
    return result;
  }

  @Delete(':code')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('code') code: string) {
    const result = this.vehicleTypesService.removeByConditions({ code: code });
    return result;
  }
}
