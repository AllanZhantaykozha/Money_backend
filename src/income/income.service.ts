import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IncomeDeleteDto, IncomeDto } from './dto/income.dto';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: IncomeDto, id: number, categoryId: number) {
    const income = await this.prisma.income.create({
      data: {
        sum: dto.sum,
        cause: dto.cause,
        userId: id,
        incomeCategoryId: +categoryId,
      },
    });

    return income;
  }

  async delete(dto: IncomeDeleteDto, id: number, categoryId: number) {
    const income = await this.byId(dto.incomeId, id);

    if (!income || income.userId !== id)
      throw new BadRequestException('you cannot delete');

    await this.prisma.income.delete({
      where: {
        id: dto.incomeId,
        incomeCategoryId: +categoryId,
      },
    });
  }

  // Personal

  async byId(incomeId: number, id: number) {
    const income = await this.prisma.income.findUnique({
      where: { id: incomeId, userId: id },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        incomeCategoryId: true,
        IncomeCategory: true,
      },
    });

    if (!income) throw new BadRequestException('Income is not found');

    return income;
  }

  async getAll(id: number) {
    const incomes = await this.prisma.income.findMany({
      where: { userId: id },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        incomeCategoryId: true,
        IncomeCategory: true,
      },
    });

    return incomes;
  }

  // Category

  async byIdCategory(incomeId: number, id: number, categoryId: number) {
    const income = await this.prisma.income.findUnique({
      where: { userId: +id, id: +incomeId, incomeCategoryId: +categoryId },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        incomeCategoryId: true,
        IncomeCategory: true,
      },
    });

    if (!income) throw new BadRequestException('income is not found');

    return income;
  }

  async getAllCategory(id: number, categoryId: number) {
    const incomes = await this.prisma.income.findMany({
      where: { userId: +id, incomeCategoryId: +categoryId },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        incomeCategoryId: true,
        IncomeCategory: true,
      },
    });

    return incomes;
  }
}
