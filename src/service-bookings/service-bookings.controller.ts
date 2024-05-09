import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServiceBookingsService } from './service-bookings.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateServiceBookingDto,
  UpdateServiceBookingDto,
} from './dtos/service-booking.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnum } from '../users/enums/user-role.enum';
import { ParkingTicketsService } from '../parking-tickets/parking-tickets.service';
import { ServicesService } from '../services/services.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Response } from 'express';
import { IsNull } from 'typeorm';

@Controller('service-bookings')
@ApiTags('Service bookings')
@UseGuards(AuthGuard)
export class ServiceBookingsController {
  constructor(
    private readonly serviceBookingsService: ServiceBookingsService,
    private readonly parkingTicketsService: ParkingTicketsService,
    private readonly servicesService: ServicesService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() bookingDto: CreateServiceBookingDto,
    @Res() res: Response,
  ) {
    try {
      const { id: userId } = request['user'];
      const ticket = await this.parkingTicketsService.getById(
        bookingDto.ticketId,
      );
      if (!ticket) {
        return res.status(400).send('ticket_not_existed');
      }

      if (ticket.userId != userId) {
        return res.status(403).send('Forbidden');
      }

      const bookingInfo = { ...bookingDto };
      const result = await this.serviceBookingsService.create(bookingInfo);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('service/pending/:serviceId')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async getPendingServiceBooking(
    @Param('serviceId') serviceId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.serviceBookingsService.find({
        select: {
          id: true,
          createdAt: true,
          ticket: { id: true, slotId: true, plateNo: true },
        },
        where: {
          serviceId: serviceId,
          isDone: false,
          ticket: { checkOutTime: IsNull() },
        },
        relations: { ticket: true },
      });
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async updateServiceBookingStatus(
    @Body() updateTicketDto: UpdateServiceBookingDto,
    @Res() res: Response,
  ) {
    try {
      const booking = await this.serviceBookingsService.findOne({
        select: { id: true, serviceId: true, ticket: { plateNo: true } },
        where: { id: updateTicketDto.id },
        relations: { ticket: true },
      });
      const service = await this.servicesService.findOne({
        where: { id: booking.serviceId },
        relations: { prices: true },
      });
      const vehicle = await this.vehiclesService.findOne({
        select: ['typeId'],
        where: { plateNo: booking.ticket.plateNo },
      });
      const unitPrice = service.prices.filter(
        (item) => item.typeId === vehicle.typeId,
      )[0].unitPrice;
      const cost = updateTicketDto.quantity * unitPrice;
      const updateInfo = { ...updateTicketDto, cost };
      const result = await this.serviceBookingsService.update(
        updateTicketDto.id,
        updateInfo,
      );
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete('/:id')
  async cancelBooking(@Param('id') id: number, @Res() res: Response) {
    try {
      const result = await this.serviceBookingsService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
