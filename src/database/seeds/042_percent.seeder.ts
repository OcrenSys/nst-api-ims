import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Percent } from '../../api/percents/entities/percent.entity';
import { PercentData } from '../data/042_percent.data';

export default class PercentSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Percent)
      .values(PercentData)
      .execute();
  }
}
