import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
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
  GetVehicleTypeRequestDto,
  UpdateVehicleTypeRequestDto,
} from './dtos/vehicle-type.dto';
import { Response } from 'express';

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
    @Res() res: Response,
  ) {
    try {
      const isDuplicate = await this.vehicleTypesService.getById(type.id);
      if (isDuplicate) {
        return res.status(400).send('typeId_existed');
      }
      type.id = type.id.toUpperCase();
      const result = await this.vehicleTypesService.create(type);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get()
  async getAll(
    @Query() filter: GetVehicleTypeRequestDto,
    @Res() res: Response,
  ) {
    try {
      const types = await this.vehicleTypesService.find({
        select: ['id', 'name', 'parkingFee', 'slotBookingFee'],
        where: filter,
      });
      return res.status(200).send(types);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(
    @Body() updateVehicleTypeDto: UpdateVehicleTypeRequestDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.vehicleTypesService.update(
        updateVehicleTypeDto.id,
        updateVehicleTypeDto,
      );
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = this.vehicleTypesService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
