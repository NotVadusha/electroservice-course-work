import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Patch('change-tariff/:userId')
  async updateTariff(
    @Param('userId') userId: string,
    @Query('tariffId') tariffId: string,
  ) {
    return await this.contractsService.changeTariff(userId, tariffId);
  }

  @Get('get-tariffs/:userId')
  async getTarriffs(@Param('userId') userId: string) {
    return await this.contractsService.getTariffs(userId);
  }
}
