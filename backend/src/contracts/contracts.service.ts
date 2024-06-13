import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ContractsService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async changeTariff(userId: string, tariffId: string) {
    const contract = await this.connection.query(
      ` SELECT cc.contract_id
        FROM clients_contracts cc
        WHERE cc.client_id = $1`,
      [userId],
    );

    return await this.connection.query(
      `
      UPDATE contracts
      SET tariff_id = $1
      WHERE id = $2
      `,
      [tariffId, contract[0].contract_id],
    );
  }

  async getTariffs(userId: string) {
    const allTariffs = await this.connection.query(`SELECT * FROM tariffs`);

    const clientTariff = await this.connection.query(
      `
      SELECT *,
      CASE
        WHEN ct.id IS NOT NULL THEN true
        ELSE false
      END AS tariff_status
      FROM
        clients c
      LEFT JOIN
        clients_contracts cc ON c.id = cc.client_id
      LEFT JOIN
        contracts ct ON cc.contract_id = ct.id
      WHERE c.id = $1
      `,
      [userId],
    );
    return allTariffs.map((tariff) => {
      console.log(tariff, clientTariff[0]);
      return {
        ...tariff,
        current: tariff.id === clientTariff[0].tariff_id,
      };
    });
  }

  async findAll() {
    const query = `
      SELECT c.id, c.description, c.created_at, c.client_id, c.tariff_id, cl.first_name, cl.last_name, t.name as tariff_name, t.price as tariff_price
      FROM contracts c
      JOIN clients cl ON c.client_id = cl.id
      JOIN tariffs t ON c.tariff_id = t.id
    `;
    return await this.connection.query(query);
  }

  async findNewClients() {
    const query = `
      SELECT DATE(created_at) AS date, COUNT(id) AS count
      FROM clients
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `;
    return await this.connection.query(query);
  }
}
