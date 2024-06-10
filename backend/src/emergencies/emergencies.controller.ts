import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@Controller('emergencies')
export class EmergenciesController {
  constructor(private readonly emergenciesService: EmergenciesService) {}

  @Post()
  create() {
    return this.emergenciesService.create();
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
  findAll() {
    return this.emergenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergenciesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmergencyDto: UpdateEmergencyDto,
  ) {
    return this.emergenciesService.update(+id, updateEmergencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergenciesService.remove(+id);
  }
}
