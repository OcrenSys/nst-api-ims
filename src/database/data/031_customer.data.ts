import { Customer } from '../models/customer.entity';
import { PersonData } from './011_person.data';

export const CustomerData: Customer[] = [
  {
    position: 1,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[3],
  },
  {
    position: 2,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[4],
    
  },
  {
    position: 3,
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    person: PersonData[5],
    
  },
];
