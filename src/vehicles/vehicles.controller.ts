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
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateVehicleRequestDto,
  GetVehicleRequestDto,
  UpdateVehicleRequestDto,
} from './dtos/vehicle.dto';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enums/user-role.enum';
import { Roles } from '../decorators/roles.decorator';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

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
      });
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
        return res.status(403).send('Forbidden');
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
        return res.status(403).send('Forbidden');
      }

      const result = await this.vehiclesService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // @Post('public/user/:userId')
  // @Public()
  // async createPublic(
  //   @Param('userId') userId: string,
  //   @Body() vehicle: CreateVehicleRequestDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const isDuplicate = await this.vehiclesService.findOne({
  //       where: { plateNo: vehicle.plateNo },
  //     });
  //     if (isDuplicate) {
  //       return res.status(400).send('vehicle_existed');
  //     }
  //     const result = await this.vehiclesService.create({
  //       userId: userId,
  //       ...vehicle,
  //     });
  //     return res.status(201).send(result);
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // }
}
