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
import { ServicesService } from './services.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import {
  CreateServiceDto,
  GetServiceDto,
  UpdateServiceDto,
} from './dtos/services.request.dto';
import { Service } from './entities/service.entity';
import { idGenerator } from 'src/shared/helpers/idGenerator';

@Controller('services')
@ApiTags('Services')
@UseGuards(AuthGuard)
export class ServicesController {
  logger: Logger;
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(@Body() service: CreateServiceDto) {
    const latest = await this.servicesService.find({
      skip: 0,
      take: 0,
      order: { createdAt: 'DESC' },
    });
    let number = 1;
    if (latest.length) number = Number(latest[0].id.substring(1)) + 1;
    const newService = { ...service, id: idGenerator(3, number, 'S') };
    return await this.servicesService.create(newService);
  }

  @Get('all')
  async getAll(): Promise<Service[]> {
    const result = await this.servicesService.find({
      select: {
        id: true,
        name: true,
        prices: { type: { id: true, name: true }, unitPrice: true },
      },
      relations: { prices: { type: true } },
    });
    return result;
  }

  @Get('filter')
  async findByFilter(@Query() query: GetServiceDto): Promise<Service[]> {
    const filter = {};
    if (query.id) filter['id'] = query.id;
    if (query.typeId) filter['prices'] = { typeId: query.typeId };
    const result = await this.servicesService.find({
      select: {
        id: true,
        name: true,
        prices: { type: { id: true, name: true }, unitPrice: true },
      },
      relations: { prices: { type: true } },
      where: filter,
    });
    return result;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateServiceDto: UpdateServiceDto) {
    const result = await this.servicesService.update(
      updateServiceDto.id,
      updateServiceDto,
    );
    return result;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('id') id: string) {
    const result = await this.servicesService.remove(id);
    return result;
  }
}
