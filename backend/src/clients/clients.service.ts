import { Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  create() {
    return 'This action adds a new client';
  }

  async login(userMail: string, password: string) {
    const user = await this.connection.query(
      `
      SELECT * FROM clients
      WHERE email = $1 AND password = $2
      `,
      [userMail, password],
    );
    return user[0];
  }

  async getAllAddresses(): Promise<any> {
    const addresses = await this.connection.query(`
      SELECT city, street, number
      FROM addresses
    `);

    const result = {};

    addresses.forEach((address) => {
      if (!result[address.city]) {
        result[address.city] = {};
      }
      if (!result[address.city][address.street]) {
        result[address.city][address.street] = [];
      }
      result[address.city][address.street].push(address.number);
    });

    return result;
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
