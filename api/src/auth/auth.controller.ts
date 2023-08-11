import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserResponseDto } from 'src/user/user.dto';
import { AuthRequestDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() body: AuthRequestDto): Promise<UserResponseDto> {
    return await this.authService.auth(body);
  }

  @Post('refresh-token')
  async refresh(
    @Headers('Authorization') refresh_token: any,
  ): Promise<UserResponseDto> {
    return await this.authService.refreshToken(refresh_token);
  }
}
