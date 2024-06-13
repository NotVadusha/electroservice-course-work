import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyDto } from './create-emergency.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEmergencyDto extends PartialType(CreateEmergencyDto) {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  expected_fix_date: Date;
}
