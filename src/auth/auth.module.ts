
import { Module, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy } from './strategy';

@Module({
  imports: [

    PassportModule,
    JwtModule.register({}),
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.OPENACC_SERVICE,
        timeout: parseInt(process.env.REQUEST_TIMEOUT, 10),
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
