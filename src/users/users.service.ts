import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from 'src/auth/services/password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}
  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );
    const { password, ...rest } = await this.prismaService.user.create({
      data: { password: hashedPassword, ...data },
    });
    return rest;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
