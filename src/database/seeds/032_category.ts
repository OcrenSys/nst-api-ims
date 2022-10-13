import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CategoryData } from '../data/032_category';
import { Category } from '../../api/categories/entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(CategoryData)
      .execute();
  }
}
