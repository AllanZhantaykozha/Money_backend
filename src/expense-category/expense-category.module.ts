import { Module } from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';
import { PrismaService } from 'src/prisma.service';
import { ExpenseService } from 'src/expense/expense.service';

@Module({
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService, PrismaService, ExpenseService],
})
export class ExpenseCategoryModule {}
