import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Banner } from '../models/banner.entity';
import { BannerData } from '../data/008_banner.data';

export default class BannerSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Banner)
      .values(BannerData)
      .execute();
  }
}
