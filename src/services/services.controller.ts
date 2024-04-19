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
  CreateServiceRequestDto,
  GetServiceRequestDto,
  UpdateServiceRequestDto,
} from './dtos/services.request.dto';
import { ServiceEntity } from './entities/service.entity';

@Controller('services')
@ApiTags('Services')
@UseGuards(AuthGuard)
export class ServicesController {
  logger: Logger;
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(@Body() service: CreateServiceRequestDto) {
    const is_duplicated = await this.servicesService.findOne({
      code: service.code,
    });
    if (is_duplicated) {
      throw new BadRequestException('code_existed');
    }
    return await this.servicesService.create(service);
  }

  @Get('all')
  async getAll(): Promise<ServiceEntity[]> {
    const result = await this.servicesService.findAll();
    return result;
  }

  @Get('filter')
  async findOneByFilter(
    @Query() filter: GetServiceRequestDto,
  ): Promise<ServiceEntity> {
    const result = await this.servicesService.findOne(filter);
    return result;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(@Body() updateServiceDto: UpdateServiceRequestDto) {
    const result = await this.servicesService.findOneAndUpdate(
      { code: updateServiceDto.code },
      { name: updateServiceDto.name, price: updateServiceDto.price },
    );
    return result;
  }

  @Delete(':code')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('code') code: string) {
    const result = await this.servicesService.removeByConditions({
      code: code,
    });
    return result;
  }
}
