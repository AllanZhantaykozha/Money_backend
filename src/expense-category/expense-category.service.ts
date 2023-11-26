import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  ExpenseCategoryDto,
  ExpenseCategoryDeleteDto,
} from './dto/expense-category.dto';

@Injectable()
export class ExpenseCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ExpenseCategoryDto, id: number) {
    const expenseCategory = await this.prisma.expenseCategory.create({
      data: {
        title: dto.title,
        userId: +id,
      },
    });

    return expenseCategory;
  }

  async delete(dto: ExpenseCategoryDeleteDto, id: number) {
    const expenseCategory = await this.byId(dto.expenseCategoryId, id);

    if (!expenseCategory || expenseCategory.userId !== id)
      throw new BadRequestException('you cannot delete');

    await this.prisma.expense.delete({
      where: {
        id: dto.expenseCategoryId,
      },
    });
  }

  async byId(categoryId: number, id: number) {
    const expense = await this.prisma.expenseCategory.findUnique({
      where: { userId: id, id: +categoryId },
      select: {
        id: true,
        title: true,
        userId: true,
        User: true,
        Expense: true,
      },
    });

    if (!expense) throw new BadRequestException('expense is not found');

    return expense;
  }

  async getAll(id: number) {
    const expenses = await this.prisma.expenseCategory.findMany({
      where: { userId: +id },
      select: {
        id: true,
        title: true,
        userId: true,
        User: true,
        Expense: true,
      },
    });

    return expenses;
  }
}
