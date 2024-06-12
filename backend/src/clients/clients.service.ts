import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CounterIndicator } from './clients.controller';

@Injectable()
export class ClientsService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

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

  async confirmCounterIndicators(id: string) {
    const query = `
      UPDATE counter_indicators
      SET status = 'confirmed'
      WHERE id = $1
    `;

    await this.connection.query(query, [id]);
  }

  async saveCounterIndicators(indicators: Record<string, CounterIndicator>) {
    let counter = 1;

    const query = `
      INSERT INTO counter_indicators (month, usage, status, captured_at)
      VALUES ($${counter++}, $${counter++}, $${counter++}, NOW())
      RETURNING id
    `;

    await Promise.all(
      Object.keys(indicators).map(async (value) => {
        const [result] = await this.connection.query(query, [
          value,
          indicators[value].usage,
          'pending',
        ]);
        const indicatorId = result.id; // Assuming the inserted row has an auto-incremented ID

        const clientId = indicators[value].clientId; // Assuming you have the clientId associated with the indicator

        const insertQuery = `
          INSERT INTO counter_indicators_clients (indicator_id, client_id)
          VALUES ($1, $2)
        `;

        await this.connection.query(insertQuery, [indicatorId, clientId]);
      }, []),
    );
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

  async getIndicators() {
    return await this.connection.query(
      `
      SELECT *
      FROM counter_indicators
      JOIN counter_indicators_clients ON counter_indicators_clients.indicator_id = counter_indicators.id
      JOIN clients ON counter_indicators_clients.client_id = clients.id
      `,
    );
  }

  async findAll() {
    return await this.connection.query(
      `
      SELECT * FROM clients
      `,
    );
  }
}
