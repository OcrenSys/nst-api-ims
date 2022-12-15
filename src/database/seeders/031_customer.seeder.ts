import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CustomerData } from '../data/031_customer.data';
import { Customer } from '../../api/customers/entities/customer.entity';

export default class CustomerSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(CustomerData)
      .execute();
  }
}
