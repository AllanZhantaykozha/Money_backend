import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import {
  ExpenseCategoryDto,
  ExpenseCategoryDeleteDto,
} from './dto/expense-category.dto';
import { ExpenseDeleteDto, ExpenseDto } from 'src/expense/dto/expense.dto';
import { ExpenseService } from 'src/expense/expense.service';

@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: ExpenseCategoryDto, @CurrentUser('id') id: number) {
    return this.expenseCategoryService.create(dto, id);
  }

  @Delete()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async delete(
    @Body() dto: ExpenseCategoryDeleteDto,
    @CurrentUser('id') id: number,
  ) {
    return this.expenseCategoryService.delete(dto, id);
  }

  @Auth()
  @Get(':categoryId')
  @HttpCode(200)
  async byId(
    @Param('categoryId') categoryId: number,
    @CurrentUser('id') id: number,
  ) {
    return this.expenseCategoryService.byId(categoryId, id);
  }

  @Auth()
  @Get()
  @HttpCode(200)
  async getAll(@CurrentUser('id') id: number) {
    return this.expenseCategoryService.getAll(id);
  }

  // Expense

  @Post(':categoryId/expense')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createExpense(
    @Body() dto: ExpenseDto,
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.expenseService.create(dto, id, categoryId);
  }

  @Delete(':categoryId/expense')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async deleteExpense(
    @Body() dto: ExpenseDeleteDto,
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.expenseService.delete(dto, id, categoryId);
  }

  @Auth()
  @Get(':categoryId/expense/:expenseId')
  @HttpCode(200)
  async byIdExpense(
    @Param('categoryId') categoryId: number,
    @CurrentUser('id') id: number,
    @Param('expenseId') expenseId: number,
  ) {
    return this.expenseService.byIdCategory(expenseId, id, categoryId);
  }

  @Auth()
  @Get(':categoryId/expense')
  @HttpCode(200)
  async getAllExpense(
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.expenseService.getAllCategory(id, categoryId);
  }
}
