import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRoleData } from '../data/014_user-roles.data';

export default class UserRolesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('user_roles_role')
      .values(UserRoleData)
      .execute();
  }
}
