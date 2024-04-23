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
  CreateParkingSlotDto,
  GetParkingSlotDto,
  UpdateParkingSlotDto,
} from './dtos/parking-slot.dto';
import { ParkingSlot } from './entities/parking-slot.entity';

@Controller('parking-slots')
@ApiTags('Parking slots')
@UseGuards(AuthGuard)
export class ParkingSlotsController {
  logger: Logger;
  constructor(private readonly parkingSlotsService: ParkingSlotsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(@Body() parkingSlot: CreateParkingSlotDto) {
    const isDuplicate = await this.parkingSlotsService.getById(parkingSlot.id);
    if (isDuplicate) {
      throw new BadRequestException('code_existed');
    }
    return await this.parkingSlotsService.create(parkingSlot);
  }

  @Get('filter')
  async findByFilter(
    @Query() filter: GetParkingSlotDto,
  ): Promise<ParkingSlot[]> {
    return await this.parkingSlotsService.find({
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
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateParkingSlotDto: UpdateParkingSlotDto) {
    const result = await this.parkingSlotsService.update(
      updateParkingSlotDto.id,
      updateParkingSlotDto,
    );
    return result;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('id') id: string) {
    const result = await this.parkingSlotsService.remove(id);
    return result;
  }
}
