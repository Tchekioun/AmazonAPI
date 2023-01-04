import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, { provide: APP_GUARD, useClass: LocalAuthGuard }],
})
export class AuthModule {}
