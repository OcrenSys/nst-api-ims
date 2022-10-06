import { Credit } from '../../api/credits/entities/credit.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CreditData } from '../data/051_credit.data';

export default class CreditSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Credit)
      .values(CreditData)
      .execute();
  }
}
