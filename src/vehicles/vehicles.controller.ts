import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateVehicleRequestDto,
  GetVehicleRequestDto,
  UpdateVehicleRequestDto,
} from './dtos/vehicle.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { Response } from 'express';

@Controller('vehicles')
@ApiTags('Vehicles')
@UseGuards(AuthGuard)
export class VehiclesController {
  logger: Logger;
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() vehicle: CreateVehicleRequestDto,
    @Res() res: Response,
  ) {
    try {
      const { id: userId } = request['user'];
      const isDuplicate = await this.vehiclesService.findOne({
        where: { plateNo: vehicle.plateNo },
      });
      if (isDuplicate) {
        return res.status(400).send('vehicle_existed');
      }
      const result = await this.vehiclesService.create({
        userId: userId,
        ...vehicle,
      });
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('/my')
  async findMyVehicles(@Req() request: Request, @Res() res: Response) {
    try {
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
      return res.status(200).send(vehicles);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('/findByFilter')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async findOneByFilter(
    @Query() filter: GetVehicleRequestDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.vehiclesService.find({
        select: {
          id: true,
          plateNo: true,
          description: true,
          userId: true,
          type: { id: true, name: true },
        },
        where: filter,
        relations: { type: true },
      })[0];
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put()
  async update(
    @Req() request: Request,
    @Body() updateVehicleDto: UpdateVehicleRequestDto,
    @Res() res: Response,
  ) {
    try {
      const user = request['user'];
      const vehicle = await this.vehiclesService.getById(updateVehicleDto.id);

      if (!vehicle) {
        return res.status(400).send('vehicle_not_existed');
      }

      if (!user.roles.includes('manager') && user.id != vehicle.userId) {
        return res.status(401).send('Unauthorized');
      }

      const result = await this.vehiclesService.update(
        updateVehicleDto.id,
        updateVehicleDto,
      );
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete(':id')
  async delete(
    @Req() request: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user = request['user'];
      const vehicle = await this.vehiclesService.getById(id);

      if (!vehicle) {
        return res.status(400).send('vehicle_not_existed');
      }

      if (!user.roles.includes('manager') && user.id != vehicle.userId) {
        return res.status(401).send('Unauthorized');
      }

      const result = await this.vehiclesService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
