import { IsString } from 'class-validator';

export class AuthRequestDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
