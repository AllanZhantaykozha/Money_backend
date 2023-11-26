import { IsNumber, IsString } from 'class-validator';

export class ExpenseDto {
  @IsNumber()
  sum: number;

  @IsString()
  cause: string;
}

export class ExpenseDeleteDto {
  @IsNumber()
  expenseId: number;
}
