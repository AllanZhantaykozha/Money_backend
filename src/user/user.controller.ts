import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  @HttpCode(200)
  async profile(@CurrentUser('id') id: number) {
    return this.userService.profile(id);
  }
}
