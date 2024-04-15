import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import {
  CreateParkingSlotRequestDto,
  GetParkingSlotRequestDto,
  UpdateParkingSlotRequestDto,
} from './dtos/parking-slot.dto';
import { ParkingSlotEntity } from './entities/parking-slot.entity';
import { connected } from 'process';

@Controller('parking-slots')
@ApiTags('Parking slots')
@UseGuards(AuthGuard)
export class ParkingSlotsController {
  logger: Logger;
  constructor(private readonly parkingSlotsService: ParkingSlotsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(@Body() parkingSlot: CreateParkingSlotRequestDto) {
    const isDuplicate = await this.parkingSlotsService.findOne({
      code: parkingSlot.code,
    });
    if (isDuplicate) {
      throw new BadRequestException('code_existed');
    }
    return await this.parkingSlotsService.create(parkingSlot);
  }

  @Get('filter')
  async findByFilter(
    @Query() filter: GetParkingSlotRequestDto,
  ): Promise<ParkingSlotEntity[]> {
    return await this.parkingSlotsService.find(filter);
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateParkingSlotDto: UpdateParkingSlotRequestDto) {
    const result = await this.parkingSlotsService.findOneAndUpdate(
      { code: updateParkingSlotDto.code },
      {
        vehicle_type: updateParkingSlotDto.vehicle_type,
        coordinate: updateParkingSlotDto.coordinate,
      },
    );
    return result;
  }

  @Delete(':code')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('code') code: string) {
    const result = await this.parkingSlotsService.removeByConditions({
      code: code,
    });
    return result;
  }
}
