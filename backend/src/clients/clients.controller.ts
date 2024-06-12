import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';

export interface CounterIndicator {
  month: string;
  usage: number;
  status: string;
  clientId: string;
}

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('save-counter-indicators')
  saveCounterIndicators(@Body() indicators: Record<string, CounterIndicator>) {
    return this.clientsService.saveCounterIndicators(indicators);
  }

  @Get('confirm-counter-indicators/:id')
  confirmCounterIndicators(@Param('id') id: string) {
    return this.clientsService.confirmCounterIndicators(id);
  }

  @Get('/addresses')
  getAddresses() {
    return this.clientsService.getAllAddresses();
  }

  @Get('/login')
  login(
    @Query('userMail') userMail: string,
    @Query('password') password: string,
  ) {
    return this.clientsService.login(userMail, password);
  }

  @Get('counter-indicators')
  getIndicators() {
    return this.clientsService.getIndicators();
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }
}
