import { Controller, Get, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('get-tariffs/:userId')
  async getTarriffs(@Param('userId') userId: string) {
    return await this.contractsService.getTariffs(userId);
  }
}
