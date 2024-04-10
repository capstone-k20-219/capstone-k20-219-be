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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  CreateUserRequestDto,
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
  @Roles(UserRoleEnum.MANAGER)
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('findUserById/:_id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async findOne(@Param('_id') _id: string): Promise<UserEntity> {
    const result = await this.userService.findOne({ _id: _id });
    return result;
  }

  @Get('findUsersByQuery/:email')
  @IsEmail()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async findOneByEmail(@Param('email') email: string): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: { $regex: email },
    });

    return user;
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async update(@Body() updateUserDto: UpdateUserRequestDto) {
    const result = await this.userService.findOneAndUpdate(
      { _id: updateUserDto._id },
      updateUserDto,
    );

    return result;
  }

  @Delete('/:_id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.USER)
  async deleteUser(@Param('_id') _id: string) {
    const result = await this.userService.removeByConditions({
      _id: _id,
    });
    return result;
  }
}
