import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async compare(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}
