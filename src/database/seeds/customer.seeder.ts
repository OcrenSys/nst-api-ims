import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { CustomerData } from '../data/customer.data';

export default class CreateCustomers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(CustomerData)
      .execute();
  }
}
