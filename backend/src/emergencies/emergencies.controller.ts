import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@Controller('emergencies')
export class EmergenciesController {
  constructor(private readonly emergenciesService: EmergenciesService) {}

  @Post()
  create(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergenciesService.create(createEmergencyDto);
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
  update(@Param('id') id: string, @Body() updateEmergencyDto: UpdateEmergencyDto) {
    return this.emergenciesService.update(+id, updateEmergencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergenciesService.remove(+id);
  }
}
