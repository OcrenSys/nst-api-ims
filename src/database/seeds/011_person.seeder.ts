import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Person } from '../../api/person/entities/person.entity';
import { PersonData } from '../data/011_person.data';

export default class PersonSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Person)
      .values(PersonData)
      .execute();
  }
}
