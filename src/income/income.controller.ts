import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  async create() {}

  async delete() {}

  async byId() {}

  async getAll() {}
}
