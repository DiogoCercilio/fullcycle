import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => ({
    // secret: `${process.env.SECRET_KEY}`,
    // signOptions: { expiresIn: '10s' },
  }),
};
