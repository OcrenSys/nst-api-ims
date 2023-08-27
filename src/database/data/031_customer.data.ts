import { faker } from '@faker-js/faker';
import { Customer } from '../models/customer.entity';
import { PersonData } from './011_person.data';

const getCustomer = (): Customer[] => {
  return Array(50)
    .fill(null)
    .map((value, index) => ({
      position: faker.number.int({ min: 0, max: 100 }),
      avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
      limit: faker.number.int({ min: 0, max: 1000 }),
      person: PersonData[index],
    }));
};

export const CustomerData: Customer[] = getCustomer();
