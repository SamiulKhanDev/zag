import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/authservice/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { OtpService } from './services/otpservice/otp.service';
import { HashService } from './services/hashservice/hash.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("secret"),
        signOptions: {
          expiresIn:"1d"
        }
      }),
    }),
    ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },OtpService,HashService]
})
export class AuthModule {}

