import { IsNumber, IsString } from 'class-validator';

export class ExpenseCategoryDto {
  @IsString()
  title: string;
}

export class ExpenseCategoryDeleteDto {
  @IsNumber()
  expenseCategoryId: number;
}
