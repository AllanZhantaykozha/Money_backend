import { Module } from '@nestjs/common';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategoryController } from './income-category.controller';
import { PrismaService } from 'src/prisma.service';
import { IncomeService } from 'src/income/income.service';

@Module({
  controllers: [IncomeCategoryController],
  providers: [IncomeCategoryService, PrismaService, IncomeService],
})
export class IncomeCategoryModule {}
