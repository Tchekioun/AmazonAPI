import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
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
}
