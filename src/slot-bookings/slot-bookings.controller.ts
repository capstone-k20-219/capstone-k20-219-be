import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SlotBookingsService } from './slot-bookings.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { ParkingHistoryService } from 'src/parking-history/parking-history.service';
import { CreateSlotBookingDto } from './dtos/slot-booking.dto';

@Controller('slot-bookings')
@ApiTags('SlotBookings')
@UseGuards(AuthGuard)
export class SlotBookingsController {
  constructor(
    private readonly slotBookingsService: SlotBookingsService,
    private readonly vehiclesService: VehiclesService,
    private readonly parkingHistoryService: ParkingHistoryService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() bookingDto: CreateSlotBookingDto,
  ) {
    // check xem xe có phải của chính chủ ko
    const user_id = request['user']._id;
    const vehicle = await this.vehiclesService.findOne({
      _id: bookingDto.vehicle_id,
    });
    if (vehicle.user_id != user_id) {
      throw new UnauthorizedException();
    }

    // check thời gian có nhiều hơn 24h ko
    const currentTime = new Date();
    const arrivalTime = new Date(bookingDto.arrival_time);
    if (currentTime.getTime() - arrivalTime.getTime() > 86400000) {
      throw new BadRequestException('longer_than_24h');
    }

    // check slot đã bị occupied/reserved chưa
    const ticket = await this.parkingHistoryService.findOne({
      slot_id: bookingDto.slot_id,
      status: 'parking',
    });
    const reserve = await this.slotBookingsService.findOne({
      slot_id: bookingDto.slot_id,
      arrival_time: { $gt: currentTime },
    });
    if (ticket || reserve) {
      throw new BadRequestException('slot_already_reserved');
    }

    const bookingInfo = { ...bookingDto, user_id: user_id };
    return await this.slotBookingsService.create(bookingInfo);
  }

  @Delete(':_id')
  async cancelBooking(@Req() request: Request, @Param('_id') _id: string) {
    const user_id = request['user']._id;
    const booking = await this.slotBookingsService.findOne({ _id: _id });
    if (booking.user_id != user_id) {
      throw new UnauthorizedException();
    }
    return await this.slotBookingsService.removeByConditions({ _id: _id });
  }
}
