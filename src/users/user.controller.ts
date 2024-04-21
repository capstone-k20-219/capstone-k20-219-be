import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Req,
  Query,
  Param,
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

@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
  logger: Logger;
  private readonly salt = 10;

  constructor(private readonly userService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @Public()
  async create(@Body() user: CreateUserRequestDto) {
    const isDuplicate = await this.userService.findOne({
      where: { email: user.email },
    });

    // This to solve the case of provider login => cannot identify newly created account or old
    if (isDuplicate) {
      throw new BadRequestException('username_existed');
    }

    // Hash password and insert into database
    const hashedPassword = await bcrypt.hash(user.password, this.salt);
    const number = await this.userService.count();
    const newUser = {
      ...user,
      id: idGenerator(8, number + 1),
      password: hashedPassword,
      role: user.role.map((item) => {
        return { role: item };
      }),
    };

    return await this.userService.create(newUser);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async find(@Req() request: Request): Promise<User> {
    const { id } = request['user'];
    return await this.userService.getById(id);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findAll(): Promise<User[]> {
    const users = await this.userService.find({ relations: { role: true } });
    const result = [];
    for (const user of users) {
      result.push({
        ...user,
        role: user.role.map((item) => item.role),
      });
    }
    return result;
  }

  @Get('findByQuery')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findOneByQuery(@Query() filter: GetUserRequestDto): Promise<User> {
    const user = await this.userService.findOne({ where: filter });
    return user;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async update(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
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

    return result;
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async updateForManager(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
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

    return result;
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async delete(@Req() request: Request) {
    const { id } = request['user'];
    const result = await this.userService.remove(id);
    return result;
  }
}
