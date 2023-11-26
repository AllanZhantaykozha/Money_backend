import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExpenseDeleteDto, ExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ExpenseDto, id: number, categoryId: number) {
    const expense = await this.prisma.expense.create({
      data: {
        sum: dto.sum,
        cause: dto.cause,
        userId: id,
        expenseCategoryId: +categoryId,
      },
    });

    return expense;
  }

  async delete(dto: ExpenseDeleteDto, id: number, categoryId: number) {
    const expense = await this.byId(dto.expenseId, id);

    if (!expense || expense.userId !== id)
      throw new BadRequestException('you cannot delete');

    await this.prisma.expense.delete({
      where: {
        id: dto.expenseId,
        expenseCategoryId: +categoryId,
      },
    });
  }

  // Personal

  async byId(expenseId: number, id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { userId: +id, id: +expenseId },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        expenseCategoryId: true,
        ExpenseCategory: true,
      },
    });

    if (!expense) throw new BadRequestException('expense is not found');

    return expense;
  }

  async getAll(id: number) {
    const expenses = await this.prisma.expense.findMany({
      where: { userId: +id },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        expenseCategoryId: true,
        ExpenseCategory: true,
      },
    });

    return expenses;
  }

  // Category

  async byIdCategory(expenseId: number, id: number, categoryId: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { userId: +id, id: +expenseId, expenseCategoryId: +categoryId },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        expenseCategoryId: true,
        ExpenseCategory: true,
      },
    });

    if (!expense) throw new BadRequestException('expense is not found');

    return expense;
  }

  async getAllCategory(id: number, categoryId: number) {
    const expenses = await this.prisma.expense.findMany({
      where: { userId: +id, expenseCategoryId: +categoryId },
      select: {
        id: true,
        sum: true,
        createdAt: true,
        userId: true,
        User: true,
        expenseCategoryId: true,
        ExpenseCategory: true,
      },
    });

    return expenses;
  }
}
