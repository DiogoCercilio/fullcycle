import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: UserCreateDto): Promise<User> {
    return await this.prismaService.user.create({ data: body });
  }
}
