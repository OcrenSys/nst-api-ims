import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../api/roles/entities/role.entity';
import { RoleData } from '../data/012_role.data';

export default class RoleSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(RoleData)
      .execute();
  }
}
