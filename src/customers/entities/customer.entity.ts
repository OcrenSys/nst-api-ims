import { Base } from 'src/utilities/classes/base.entity';

export class Customer extends Base {
  name: string;
  lastName: string;
  phone: string;
  address: string;
  order: number;
  avatar: string;
  limit: string;

  //   credits: Credit [];
}
