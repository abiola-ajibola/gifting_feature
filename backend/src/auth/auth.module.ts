import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }) as DynamicModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
