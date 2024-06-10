import { Injectable } from '@nestjs/common';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class EmergenciesService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  create() {
    return 'This action adds a new emergency';
  }

  async getEmergenciesByAddress(city: string, street: string, number: number) {
    const clients = await this.connection.query(
      `
      SELECT * FROM addresses WHERE city = $1 AND street = $2 AND number = $3`,
      [city, street, number],
    );
    if (clients.length === 0) return [];
    return await this.connection.query(
      `
        SELECT e.*
        FROM emergencies e
        JOIN emergencies_clients ec ON e.id = ec.emergency_id
        JOIN clients c ON ec.client_id = c.id
      `,
      [],
    );
  }

  findAll() {
    return `This action returns all emergencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emergency`;
  }

  update(id: number, updateEmergencyDto: UpdateEmergencyDto) {
    return `This action updates a #${id} emergency`;
  }

  remove(id: number) {
    return `This action removes a #${id} emergency`;
  }
}
