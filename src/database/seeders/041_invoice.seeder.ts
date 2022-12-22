import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Order } from '../models/order.entity';
import { OrderData } from '../data/041_order.data';

export default class orderSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(OrderData)
      .execute();
  }
}
