import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Auth()
  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
