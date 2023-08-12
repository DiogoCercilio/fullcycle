import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from 'src/user/user.dto';
import { AuthRequestDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(data: AuthRequestDto): Promise<UserResponseDto> {
    const { email, password } = data;
    const user = await this.service.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const matches = await argon2.verify(user.password, password);

    if (!matches) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.createAccessToken(user.id, user.email),
      refresh_token: await this.createRefreshToken(user.id, user.email),
    };
  }

  async refreshToken(refreshToken: string): Promise<UserResponseDto> {
    try {
      const token = refreshToken.split(' ')[1];
      const payload = await this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        audience: 'RefreshToken.API',
      });
      const user = await this.service.user.findUnique({
        where: { id: payload.sub, email: payload.email },
      });

      // ...Aqui poderia fazer validações adicionais (Ex: usuário está bloqueado?)

      if (!user) {
        throw new UnauthorizedException('Expired Token');
      }
      return {
        access_token: await this.createAccessToken(user.id, user.email),
        refresh_token: await this.createRefreshToken(user.id, user.email),
      };
    } catch (err) {
      console.log(err);
    }
  }

  private async createAccessToken(sub: number, username: string) {
    return await this.jwtService.sign(
      { sub, username },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      },
    );
  }

  private async createRefreshToken(sub: number, username: string) {
    return await this.jwtService.sign(
      { sub, username },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        audience: 'RefreshToken.API',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );
  }
}
