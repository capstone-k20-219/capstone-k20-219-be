import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  CreateUserRequestDto,
  GetUserRequestDto,
  UpdateUserRequestDto,
} from './dtos/user.request.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRoleEnum } from './enums/user-role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
  logger: Logger;
  private readonly salt = 10;

  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @Public()
  async create(@Body() user: CreateUserRequestDto) {
    const isDuplicate = await this.userService.findOne({
      email: user.email,
    });

    // This to solve the case of provider login => cannot identify newly created account or old
    if (isDuplicate) {
      throw new BadRequestException('username_existed');
    }

    // Hash password and insert into database
    const hashedPassword = await bcrypt.hash(user.password, this.salt);
    const newUser = {
      ...user,
      password: hashedPassword,
    } as UserEntity;

    return this.userService.create(newUser);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async find(@Req() request: Request): Promise<UserEntity> {
    const _id = request['user']._id;
    return await this.userService.findOne({ _id: _id });
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('findByQuery')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.MANAGER)
  async findOneByQuery(
    @Query() filter: GetUserRequestDto,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(filter);
    return user;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async update(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserRequestDto,
  ) {
    const _id = request['user']._id;
    const result = await this.userService.findOneAndUpdate(
      { _id: _id },
      updateUserDto,
    );

    return result;
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async delete(@Req() request: Request) {
    const _id = request['user']._id;
    const result = await this.userService.removeByConditions({
      _id: _id,
    });
    return result;
  }
}
