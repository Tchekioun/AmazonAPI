import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data: data });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findFirst({ where: { id } });
  }

  update(id: number, data: Prisma.ProductUpdateInput) {
    return this.prismaService.product.update({ where: { id }, data: data });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
