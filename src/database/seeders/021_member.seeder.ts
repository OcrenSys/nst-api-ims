import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Member } from '../models/member.entity';
import { MemberData } from '../data/021_member.data';

export default class MemberSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Member)
      .values(MemberData)
      .execute();
  }
}
