import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { CreateEmergencyDto } from './dto/create-emergency.dto';

@Injectable()
export class EmergenciesService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async create(createEmergencyDto: CreateEmergencyDto) {
    const emergency = await this.connection.query(
      `
        INSERT INTO emergencies (created_at, description, status)
        VALUES (NOW(), $1, 'Підтверджується')
        RETURNING *
      `,
      [createEmergencyDto.description],
    );
    await this.connection.query(
      `
      INSERT INTO emergencies_clients (emergency_id, client_id)
      VALUES ($1, $2)
      `,
      [emergency[0].id, createEmergencyDto.client_id],
    );
    return emergency;
  }

  async updateEmergency(id: string, updateEmergencyDto: UpdateEmergencyDto) {
    return await this.connection.query(
      `
        UPDATE emergencies
        SET status = $1, expected_fix_date = $2
        WHERE id = $3
        RETURNING *
      `,
      [
        updateEmergencyDto.status,
        new Date(updateEmergencyDto.expected_fix_date),
        id,
      ],
    );
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

  async findAll(isUserAnAdmin: boolean, userId: string) {
    return await this.connection.query(
      `
        SELECT e.*
        FROM emergencies e
        JOIN emergencies_clients ec ON e.id = ec.emergency_id
        JOIN clients c ON ec.client_id = c.id
        ${isUserAnAdmin ? 'WHERE c.id = $1' : ''}
        `,
      [...(isUserAnAdmin ? [userId] : [])],
    );
  }
  async remove(id: string) {
    await this.connection.query(
      `
        DELETE FROM emergencies_clients WHERE emergency_id = $1
      `,
      [id],
    );
    return await this.connection.query(
      `
        DELETE FROM emergencies WHERE id = $1
        RETURNING id
      `,
      [id],
    );
  }
}
