import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByEmail(username);
    const isMatched = await this.passwordService.compare(
      password,
      user.password,
    );
    if (isMatched) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { name: user.name, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
