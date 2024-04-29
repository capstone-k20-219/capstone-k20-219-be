import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SlotBookingsService } from './slot-bookings.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSlotBookingDto } from './dtos/slot-booking.dto';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { ParkingSlotsService } from 'src/parking-slots/parking-slots.service';
import { ParkingTicketsService } from 'src/parking-tickets/parking-tickets.service';
import { MoreThan } from 'typeorm';
import { Response } from 'express';

@Controller('slot-bookings')
@ApiTags('Slot bookings')
@UseGuards(AuthGuard)
export class SlotBookingsController {
  constructor(
    private readonly slotBookingsService: SlotBookingsService,
    private readonly vehiclesService: VehiclesService,
    private readonly slotsService: ParkingSlotsService,
    private readonly ticketsService: ParkingTicketsService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() bookingDto: CreateSlotBookingDto,
    @Res() res: Response,
  ) {
    try {
      // check xem xe có phải của chính chủ ko
      const { id: userId } = request['user'];
      const vehicle = await this.vehiclesService.getById(bookingDto.vehicleId);
      if (vehicle.userId != userId) {
        return res.status(401).send('Unauthorized');
      }

      // check thời gian có nhiều hơn 24h và là một thời điểm trong tương lai ko
      const currentTime = new Date();
      let arrivalTime = new Date(bookingDto.arrivalTime);
      let timeGap = (arrivalTime.getTime() - currentTime.getTime()) / 1000;
      if (timeGap > 86400 || timeGap <= 1800) {
        return res
          .status(400)
          .send(
            'Inappropriate arrival time (must be no later than 24 hours and no earlier than 30 minutes from now',
          );
      }

      // check slot có đúng type với vehicle ko
      const slotType = await this.slotsService.getById(bookingDto.slotId);
      if (slotType.typeId != vehicle.typeId) {
        return res
          .status(400)
          .send(`Vehicle not appropriate at slot ${bookingDto.slotId}`);
      }

      // check slot đã bị occupied/reserved chưa
      const ticket = await this.ticketsService.findOne({
        where: { slotId: bookingDto.slotId, checkOutTime: null },
      });
      const reserve = await this.slotBookingsService.findOne({
        where: {
          slotId: bookingDto.slotId,
          arrivalTime: MoreThan(currentTime),
        },
      });
      if (ticket || reserve) {
        return res
          .status(400)
          .send(`Slot ${bookingDto.slotId} is either reserved or occupied`);
      }

      arrivalTime = new Date(arrivalTime.getTime() + 30 * 60000);
      const bookingInfo = { ...bookingDto, arrivalTime: arrivalTime };
      const result = await this.slotBookingsService.create(bookingInfo);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete(':id')
  async cancelBooking(
    @Req() request: Request,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { id: userId } = request['user'];
      const booking = await this.slotBookingsService.findOne({
        select: { vehicle: { userId: true } },
        where: { id: id },
        relations: { vehicle: true },
      });
      if (booking.vehicle.userId != userId) {
        return res.status(401).send('Unauthorized');
      }
      const result = await this.slotBookingsService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
