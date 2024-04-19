import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ServiceBookingsService } from './service-bookings.service';
import { ParkingHistoryService } from 'src/parking-history/parking-history.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateServiceBookingDto,
  UpdateServiceBookingDto,
} from './dtos/service-booking.dto';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { ServiceBookingEntity } from './entities/service-booking.entity';

@Controller('service-bookings')
@ApiTags('ServiceBookings')
@UseGuards(AuthGuard)
export class ServiceBookingsController {
  constructor(
    private readonly serviceBookingsService: ServiceBookingsService,
    private readonly parkingHistoryService: ParkingHistoryService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() bookingDto: CreateServiceBookingDto,
  ) {
    const user_id = request['user']._id;
    const parking_ticket = await this.parkingHistoryService.findOne({
      _id: bookingDto.parking_ticket_id,
    });
    if (!parking_ticket) {
      throw new BadRequestException('ticket_not_existed');
    }

    const vehicle = await this.vehiclesService.findOne({
      _id: parking_ticket.vehicle_id,
    });
    if (vehicle.user_id != user_id) {
      throw new UnauthorizedException();
    }

    const bookingInfo = { ...bookingDto, quantity: 0, status: 'pending' };
    return await this.serviceBookingsService.create(bookingInfo);
  }

  @Get('service/pending/:_id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async getPendingServiceBooking(
    @Param('_id') _id: string,
  ): Promise<ServiceBookingEntity[]> {
    return await this.serviceBookingsService.find({
      service_id: _id,
      status: 'pending',
    });
  }

  @Put('updateTicket/:_id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async updateServiceBookingStatus(
    @Param('_id') _id: string,
    @Body() updateTicketDto: UpdateServiceBookingDto,
  ) {
    return await this.serviceBookingsService.findOneAndUpdate(
      { _id: _id },
      { quantity: updateTicketDto.quantity, status: 'done' },
    );
  }

  @Delete('/:_id')
  async cancelBooking(@Param('_id') _id: string) {
    return await this.serviceBookingsService.removeByConditions({ _id: _id });
  }
}
