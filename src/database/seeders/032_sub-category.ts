import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { SubCategoryData } from '../data/032_subCategory';
import { SubCategory } from '../models/sub-category.entity';

export default class SubCategorySeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(SubCategory)
      .values(SubCategoryData)
      .execute();
  }
}
