import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Brand } from '../../api/brands/entities/brand.entity';
import { BrandData } from '../data/009_brand.data';

export default class BrandSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Brand)
      .values(BrandData)
      .execute();
  }
}
