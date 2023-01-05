import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { env } from 'process';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordService } from './services/password.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.PASSWORD,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtStrategy },
  ],
  controllers: [AuthController],
  exports: [PasswordService],
})
export class AuthModule {}
