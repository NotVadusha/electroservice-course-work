import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEmergencyDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID('all')
  @IsNotEmpty()
  client_id: string;
}
