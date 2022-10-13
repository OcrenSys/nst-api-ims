import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { SectionData } from '../data/009_section.data';
import { Section } from '../../api/sections/entities/section.entity';

export default class SectionSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Section)
      .values(SectionData)
      .execute();
  }
}
