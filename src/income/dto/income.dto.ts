import { IsNumber, IsString } from 'class-validator';

export class IncomeDto {
  @IsNumber()
  sum: number;

  @IsString()
  cause: string;
}

export class IncomeDeleteDto {
  @IsNumber()
  incomeId: number;
}
