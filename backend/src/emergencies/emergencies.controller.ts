import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { CreateEmergencyDto } from './dto/create-emergency.dto';

@Controller('emergencies')
export class EmergenciesController {
  constructor(private readonly emergenciesService: EmergenciesService) {}

  @Post()
  create(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergenciesService.create(createEmergencyDto);
  }

  @Put(':id')
  updateEmergency(
    @Param('id') id: string,
    @Body() updateEmergencyDto: UpdateEmergencyDto,
  ) {
    return this.emergenciesService.updateEmergency(id, updateEmergencyDto);
  }

  @Get('/emergencies-by-address')
  getEmergenciesByAddress(
    @Query('city') city: string,
    @Query('street') street: string,
    @Query('number') number: number,
  ) {
    return this.emergenciesService.getEmergenciesByAddress(
      city,
      street,
      number,
    );
  }

  @Get()
  findAll(@Query('admin') admin: boolean, @Query('clientId') clientId: string) {
    return this.emergenciesService.findAll(admin, clientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergenciesService.remove(id);
  }
}
