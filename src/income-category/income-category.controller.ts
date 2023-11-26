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
import { IncomeCategoryService } from './income-category.service';
import {
  IncomeCategoryDeleteDto,
  IncomeCategoryDto,
} from './dto/income-category.dto';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { IncomeService } from 'src/income/income.service';
import { IncomeDeleteDto, IncomeDto } from 'src/income/dto/income.dto';

@Controller('income-category')
export class IncomeCategoryController {
  constructor(
    private readonly incomeCategoryService: IncomeCategoryService,
    private readonly incomeService: IncomeService,
  ) {}

  @Post()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: IncomeCategoryDto, @CurrentUser('id') id: number) {
    return this.incomeCategoryService.create(dto, id);
  }

  @Delete()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async delete(
    @Body() dto: IncomeCategoryDeleteDto,
    @CurrentUser('id') id: number,
  ) {
    return this.incomeCategoryService.delete(dto, id);
  }

  @Auth()
  @Get(':categoryId')
  @HttpCode(200)
  async byId(
    @Param('categoryId') categoryId: number,
    @CurrentUser('id') id: number,
  ) {
    return this.incomeCategoryService.byId(categoryId, id);
  }

  @Auth()
  @Get()
  @HttpCode(200)
  async getAll(@CurrentUser('id') id: number) {
    return this.incomeCategoryService.getAll(id);
  }

  // Income

  @Post(':categoryId/income')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async createIncome(
    @Body() dto: IncomeDto,
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.incomeService.create(dto, id, categoryId);
  }

  @Delete(':categoryId/income')
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async deleteIncome(
    @Body() dto: IncomeDeleteDto,
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.incomeService.delete(dto, id, categoryId);
  }

  @Auth()
  @Get(':categoryId/income/:incomeId')
  @HttpCode(200)
  async byIdIncome(
    @Param('categoryId') categoryId: number,
    @CurrentUser('id') id: number,
    @Param('incomeId') incomeId: number,
  ) {
    return this.incomeService.byIdCategory(incomeId, id, categoryId);
  }

  @Auth()
  @Get(':categoryId/income')
  @HttpCode(200)
  async getAllIncome(
    @CurrentUser('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.incomeService.getAllCategory(id, categoryId);
  }
}
