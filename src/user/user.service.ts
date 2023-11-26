import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async profile(id: number) {
    const profile = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        Incomes: true,
        IncomeCategory: true,
        Expense: true,
        ExpenseCategory: true,
      },
    });

    return { ...profile, balance: await this.getBalance(id) };
  }

  private async getBalance(id: number) {
    let income = [];
    let expense = [];
    let incomeSum = 0;
    let expenseSum = 0;

    const profile = await this.prisma.user.findUnique({
      where: { id },
      select: {
        Incomes: true,
        Expense: true,
      },
    });

    profile.Incomes.map((obj: any) => income.push(obj.sum));
    profile.Expense.map((obj: any) => expense.push(obj.sum));

    income.forEach(function (income) {
      incomeSum += income;
    });

    expense.forEach(function (expense) {
      expenseSum += expense;
    });

    return incomeSum - expenseSum;
  }
}
