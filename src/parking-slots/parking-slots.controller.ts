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
  Res,
  UseGuards,
} from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoleEnum } from '../users/enums/user-role.enum';
import {
  CreateParkingSlotDto,
  GetParkingSlotDto,
  UpdateParkingSlotDto,
  UpsertParkingSlotDto,
} from './dtos/parking-slot.dto';
import { Response } from 'express';

@Controller('parking-slots')
@ApiTags('Parking slots')
@UseGuards(AuthGuard)
export class ParkingSlotsController {
  logger: Logger;
  constructor(private readonly parkingSlotsService: ParkingSlotsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(
    @Body() parkingSlot: CreateParkingSlotDto,
    @Res() res: Response,
  ) {
    try {
      const isDuplicate = await this.parkingSlotsService.getById(
        parkingSlot.id,
      );
      if (isDuplicate) {
        return res.status(400).send('code_existed');
      }
      const result = await this.parkingSlotsService.create(parkingSlot);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Post('/upsert')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async upsert(@Body() upsertDto: UpsertParkingSlotDto, @Res() res: Response) {
    // delete the redundant slots
    const currentSlots = await this.parkingSlotsService.find({
      select: ['id'],
    });
    const currentSlotsId = currentSlots.map((slot) => slot.id);
    const deletedId = [];
    const dtoIds = upsertDto.slots.map((item) => item.id);
    for (const id of currentSlotsId) {
      if (!dtoIds.includes(id)) deletedId.push(id);
    }
    if (deletedId.length)
      await this.parkingSlotsService.removeByConditions(deletedId);

    // upsert and return the result
    await this.parkingSlotsService.upsert(upsertDto.slots);
    res.status(200).send(true);
  }

  @Get('filter')
  async findByFilter(@Query() filter: GetParkingSlotDto, @Res() res: Response) {
    try {
      const result = await this.parkingSlotsService.find({
        select: {
          id: true,
          x_start: true,
          x_end: true,
          y_start: true,
          y_end: true,
          typeId: true,
          type: { name: true },
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
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(
    @Body() updateParkingSlotDto: UpdateParkingSlotDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.parkingSlotsService.update(
        updateParkingSlotDto.id,
        updateParkingSlotDto,
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
      const result = await this.parkingSlotsService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
