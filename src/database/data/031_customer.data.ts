import { Customer } from '../../api/customers/entities/customer.entity';
import { PersonData } from './011_person.data';

export const CustomerData: Customer[] = [
  {
    order: 1,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[3],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[4],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 3,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[5],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
