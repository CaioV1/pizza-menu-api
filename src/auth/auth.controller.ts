import { Body, Controller, Post } from '@nestjs/common';

import { Public } from './constants';
import { AuthService } from './auth.service';
import Token from './interfaces/token.interface';
import { AuthUserDTO } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async auth(@Body() authUserDTO: AuthUserDTO): Promise<Token> {
    const accessToken = await this.authService.authLogin(authUserDTO);
    return { accessToken };
  }
}
