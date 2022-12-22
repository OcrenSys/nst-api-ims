import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Image } from '../models/image.entity';
import { ImageData } from '../data/001_image.data';

export default class ImageSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(ImageData)
      .execute();
  }
}
