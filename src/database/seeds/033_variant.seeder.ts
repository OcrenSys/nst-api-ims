import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Variant } from '../../api/variants/entities/variant.entity';
import { VariantData } from '../data/033_variant.data';

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
