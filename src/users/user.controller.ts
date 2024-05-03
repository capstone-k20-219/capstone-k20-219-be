import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
  Query,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserRequestDto,
  GetUserRequestDto,
  UpdateUserRequestDto,
} from './dtos/user.request.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { UserRoleEnum } from './enums/user-role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { idGenerator } from 'src/shared/helpers/idGenerator';
import { Response } from 'express';

@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
  logger: Logger;
  private readonly salt = 10;

  constructor(private readonly userService: UsersService) {}

  @Post()
  @Public()
  async create(@Body() user: CreateUserRequestDto, @Res() res: Response) {
    try {
      const isDuplicate = await this.userService.findOne({
        where: { email: user.email },
      });

      // This to solve the case of provider login => cannot identify newly created account or old
      if (isDuplicate) {
        res.status(400).send('email_existed');
      }

      // Hash password and insert into database
      const hashedPassword = await bcrypt.hash(user.password, this.salt);
      const latest = await this.userService.find({
        skip: 0,
        take: 1,
        order: { createdAt: 'DESC' },
      });
      let number = 1;
      if (latest.length) number = Number(latest[0].id) + 1;
      const newUser = {
        ...user,
        id: idGenerator(8, number),
        password: hashedPassword,
        role: user.role.map((item) => {
          return { role: item };
        }),
      };

      const result = await this.userService.create(newUser);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get()
  async find(@Req() request: Request, @Res() res: Response) {
    try {
      const { id } = request['user'];
      const user = (
        await this.userService.find({
          where: { id },
          relations: { role: true, bankAccount: true },
        })
      )[0];
      const result = {
        ...user,
        role: user.role.map((item) => item.role),
      };
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.find({ relations: { role: true } });
      const result = [];
      for (const user of users) {
        result.push({
          ...user,
          role: user.role.map((item) => item.role),
        });
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('findByQuery')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findByQuery(@Query() filter: GetUserRequestDto, @Res() res: Response) {
    try {
      const cond = {};
      if (Object.keys(filter).length) {
        cond['where'] = {};
      }
      if (filter.id) {
        cond['where']['id'] = filter.id;
      }
      if (filter.role) {
        cond['where']['role'] = { role: filter.role };
      }

      const user = await this.userService.find(cond);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async update(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserRequestDto,
    @Res() res: Response,
  ) {
    try {
      const { id } = request['user'];
      const user = await this.userService.getById(id);

      const updateUser = {
        ...updateUserDto,
        role: user.role,
      } as User;

      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(
          updateUserDto.password,
          this.salt,
        );
        updateUser.password = hashedPassword;
      }

      const result = await this.userService.update(id, updateUser);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async updateForManager(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
    @Res() res: Response,
  ) {
    try {
      const updateUser = {
        ...updateUserDto,
        role: updateUserDto.role.map((item) => {
          return { role: item };
        }),
      };
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(
          updateUserDto.password,
          this.salt,
        );
        updateUser.password = hashedPassword;
      }

      const result = await this.userService.update(id, updateUser);

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async delete(@Req() request: Request, @Res() res: Response) {
    try {
      const { id } = request['user'];
      const result = await this.userService.remove(id);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
