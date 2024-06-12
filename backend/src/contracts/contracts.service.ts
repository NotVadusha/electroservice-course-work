import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ContractsService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async getTariffs(userId: string) {
    return await this.connection.query(
      `
      SELECT * FROM tariffs
      `,
      [],
    );
  }
}
