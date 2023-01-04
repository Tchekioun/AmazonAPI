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

  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    return this.prismaService.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({where:{email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
