import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
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
import { idGenerator } from 'src/shared/helpers/idGenerator';
import { Response } from 'express';

@Controller('services')
@ApiTags('Services')
@UseGuards(AuthGuard)
export class ServicesController {
  logger: Logger;
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async create(@Body() service: CreateServiceDto, @Res() res: Response) {
    try {
      const latest = await this.servicesService.find({
        skip: 0,
        take: 1,
        order: { createdAt: 'DESC' },
      });
      let number = 1;
      if (latest.length) number = Number(latest[0].id.substring(1)) + 1;
      const newService = { ...service, id: idGenerator(3, number, 'S') };
      const result = await this.servicesService.create(newService);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('all')
  async getAll(@Res() res: Response) {
    try {
      const result = await this.servicesService.find({
        select: {
          id: true,
          name: true,
          prices: { type: { id: true, name: true }, unitPrice: true },
        },
        relations: { prices: { type: true } },
      });
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('filter')
  async findByFilter(@Query() query: GetServiceDto, @Res() res: Response) {
    try {
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
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async update(
    @Body() updateServiceDto: UpdateServiceDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.servicesService.update(
        updateServiceDto.id,
        updateServiceDto,
      );
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.servicesService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
