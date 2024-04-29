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
import { CheckPermissionDto, SignInDto } from './dtos/sign-in.dto';
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
  refreshToken(@Req() req): Promise<{ access_token: string }> {
    const { id } = req.body;
    return this.authService.generateJWT(id);
  }
}
