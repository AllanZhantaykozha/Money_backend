import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { IncomeCategoryModule } from './income-category/income-category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, IncomeModule, ExpenseModule, ExpenseCategoryModule, IncomeCategoryModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
