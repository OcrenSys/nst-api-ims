import { Variant } from '../../variants/entities/variant.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { VariantData } from '../data/03_variant.data';

export default class VariantSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Variant)
      .values(VariantData)
      .execute();
  }
}
