import { Customer } from '../../customers/entities/customer.entity';

export const CustomerData: Customer[] = [
  {
    order: 1,
    nickName: 'asdfasdfasd',
    name: 'Sebastian',
    lastName: 'Franco',
    phone: '88878889',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    nickName: 'asdfsadfasdfs',
    name: 'Juan',
    lastName: 'Sebastian',
    phone: '88878889',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 3,
    nickName: 'asdfasdfsdf',
    name: 'Gloria',
    lastName: 'Trevis',
    phone: '88878889',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 4,
    nickName: 'asdfasdfasdfasdf',
    name: 'Alex',
    lastName: 'Ubago',
    phone: '88878889',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 5,
    nickName: 'asdfasdfasdfasd',
    name: 'Enrrique',
    lastName: 'Iglesias',
    phone: '88878889',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    avatar: 'https://picsum.photos/200/300',
    limit: 1000,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
