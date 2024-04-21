import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ServiceBookingsService } from 'src/service-bookings/service-bookings.service';
import { ParkingHistoryService } from 'src/parking-history/parking-history.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { CreateBillRequestDto, GetBillRequestDto } from './dtos/bill.dto';
import { BillEntity, IBillItem } from './entities/bill.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { ServicesService } from 'src/services/services.service';
import { filter } from 'rxjs';

@Controller('bills')
@ApiTags('Bills')
@UseGuards(AuthGuard)
export class BillsController {
  constructor(
    private readonly billsService: BillsService,
    private readonly serviceBookingService: ServiceBookingsService,
    private readonly parkingHistoryService: ParkingHistoryService,
    private readonly vehicleService: VehiclesService,
    private readonly serviceService: ServicesService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async create(@Body() createBillDto: CreateBillRequestDto) {
    const parking_fee = 5;

    const ticket = await this.parkingHistoryService.findOne({
      _id: createBillDto.parking_ticket_id,
    });
    const vehicle = await this.vehicleService.findOne({
      _id: ticket.vehicle_id,
    });
    const services = await this.serviceBookingService.find({
      parking_ticket_id: createBillDto.parking_ticket_id,
    });

    // generate bill items
    const items: IBillItem[] = [];
    for (const item of services) {
      const service = await this.serviceService.findOne({
        _id: item.service_id,
      });
      const price = service.price.find(
        (ele) => ele.type_id === vehicle.type_id,
      ).price;
      const cost = price * item.quantity;
      items.push({ service_id: item.service_id, cost });
    }
    const duration = Math.ceil(
      (new Date().getTime() - ticket.createdAt.getTime()) / (60 * 60 * 1000),
    );
    const bill = {
      user_id: vehicle.user_id,
      parking_ticket_id: createBillDto.parking_ticket_id,
      parking_cost: duration * parking_fee,
      items: items,
      is_paid: false,
    } as BillEntity;

    // add bill to db
    return await this.billsService.create(bill);
  }

  @Get('/personal/:user_id')
  async getPersonalBills(
    @Param('user_id') user_id: string,
    @Query() filter: GetBillRequestDto,
  ): Promise<BillEntity[]> {
    const cond = { user_id: user_id, is_paid: filter.is_paid };
    if (filter.from) cond['createdAt']['$gte'] = new Date(filter.from);
    if (filter.to) cond['createdAt']['$lte'] = new Date(filter.to);
    return await this.billsService.find(cond);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER, UserRoleEnum.EMPLOYEE)
  async getAll(@Query() filter: GetBillRequestDto): Promise<BillEntity[]> {
    const cond = { is_paid: filter.is_paid };
    if (filter.from) cond['createdAt']['$gte'] = new Date(filter.from);
    if (filter.to) cond['createdAt']['$lte'] = new Date(filter.to);
    return await this.billsService.find(cond);
  }
}
