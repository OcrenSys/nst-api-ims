import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { OrderDetail } from '../models/order-detail.entity';
import { OrderDetailsData } from '../data/042_order-details.data';

export default class InvoiceSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(OrderDetail)
      .values(OrderDetailsData)
      .execute();
  }
}
