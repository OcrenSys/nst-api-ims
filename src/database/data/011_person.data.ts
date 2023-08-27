import { Person } from '../models/person.entity';
import { faker } from '@faker-js/faker';

const getPeople = (): Person[] => {
  return Array(50)
    .fill(null)
    .map(() => ({
      nickName: faker.person.prefix(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number('505-####-####'),
      address: `${faker.location.city()}`,
    }));
};

export const PersonData: Person[] = getPeople();
