import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class UserCreateDto implements Prisma.UserCreateManyInput {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserResponseDto {
  access_token: string;
  refresh_token: string;
}
