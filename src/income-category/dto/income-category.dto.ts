import { IsNumber, IsString } from 'class-validator';

export class IncomeCategoryDto {
  @IsString()
  title: string;
}

export class IncomeCategoryDeleteDto {
  @IsNumber()
  incomeCategoryId: number;
}
