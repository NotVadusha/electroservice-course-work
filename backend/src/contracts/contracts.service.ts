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
}
