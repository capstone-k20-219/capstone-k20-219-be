import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParkingHistoryService } from './parking-history.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import {
  CreateParkingHistoryDto,
  UpdateParkingHistoryDto,
} from './dtos/parking-history.request.dto';
import { ParkingHistoryEntity } from './entities/parking-history.entity';
import { SlotBookingsService } from 'src/slot-bookings/slot-bookings.service';

@Controller('parking-history')
@ApiTags('ParkingHistories')
@UseGuards(AuthGuard)
export class ParkingHistoryController {
  constructor(
    private readonly parkingHistoryService: ParkingHistoryService,
    private readonly slotBookingService: SlotBookingsService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('check-in')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async checkIn(@Body() checkInInfo: CreateParkingHistoryDto) {
    const checkIn = {
      slot_id: checkInInfo.slot_id,
      vehicle_id: checkInInfo.vehicle_id,
      status: 'parking',
      check_out_time: null,
    } as ParkingHistoryEntity;

    // thêm vào db
    const result = await this.parkingHistoryService.create(checkIn);
    return result;
  }

  @Put('check-out')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async checkOut(@Body() checkOutDto: UpdateParkingHistoryDto) {
    // check xem bill đã được cập nhật là đã thanh toán chưa

    // cập nhật trạng thái và thời gian checkout của ticket
    const ticket = await this.parkingHistoryService.findOneAndUpdate(
      { _id: checkOutDto._id },
      { check_out_time: new Date(), status: 'done' },
    );
    return ticket;
  }
}
