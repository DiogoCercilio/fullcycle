import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';
import { User } from '@prisma/client';
// import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async auth(@Body() body: UserCreateDto): Promise<User> {
    return await this.userService.create(body);
  }
}
