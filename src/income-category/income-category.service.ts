import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IncomeCategoryDeleteDto,
  IncomeCategoryDto,
} from './dto/income-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IncomeCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: IncomeCategoryDto, id: number) {
    const incomeCategory = await this.prisma.incomeCategory.create({
      data: {
        title: dto.title,
        userId: id,
      },
    });

    return incomeCategory;
  }

  async delete(dto: IncomeCategoryDeleteDto, id: number) {
    const incomeCategory = await this.byId(dto.incomeCategoryId, id);

    if (!incomeCategory || incomeCategory.userId !== id)
      throw new BadRequestException('you cannot delete');

    await this.prisma.income.delete({
      where: {
        id: dto.incomeCategoryId,
      },
    });
  }

  async byId(categoryId: number, id: number) {
    const income = await this.prisma.incomeCategory.findUnique({
      where: { userId: id, id: categoryId },
      select: {
        id: true,
        title: true,
        userId: true,
        User: true,
        Incomes: true,
      },
    });

    if (!income) throw new BadRequestException('Income is not found');

    return income;
  }

  async getAll(id: number) {
    const incomes = await this.prisma.incomeCategory.findMany({
      where: { userId: id },
      select: {
        id: true,
        title: true,
        userId: true,
        User: true,
        Incomes: true,
      },
    });

    return incomes;
  }
}
