import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Customer } from '../../api/customers/entities/customer.entity';
import { CustomerData } from '../data/01_customer.data';

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
