import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CheckPermissionDto,
  LogOutDto,
  RefreshTokenRequestDto,
  SignInDto,
} from './dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('checkPermission')
  @UseGuards(AuthGuard)
  checkPermission(
    @Req() req: Request,
    @Body() checkPermissionDto: CheckPermissionDto,
  ) {
    const { roles: userRoles } = req['user'];
    return this.authService.checkPermission(userRoles, checkPermissionDto.role);
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    return await this.authService.refresh(refresh_token);
  }

  @Post('/log-out')
  @UseGuards(AuthGuard)
  async logOut(@Req() req, @Body() logOutDto: LogOutDto) {
    const { refresh_token } = logOutDto;
    const { id } = req['user'];
    return await this.authService.logOut(id, false, refresh_token);
  }

  @Post('/log-out/all')
  @UseGuards(AuthGuard)
  async logOutAll(@Req() req) {
    const { id } = req['user'];
    return await this.authService.logOut(id, true);
  }
}
