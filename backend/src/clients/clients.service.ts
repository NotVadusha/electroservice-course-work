import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll() {
    return await this.connection.query(
      `
      SELECT * FROM clients
      `,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
