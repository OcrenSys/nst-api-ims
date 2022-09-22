import { Customer } from '../../customers/entities/customer.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Customer, (faker) => {
  const customer = new Customer();
  // customer.order = parseInt(faker.finance.amount());
  // customer.nickName = faker.name.firstName('male');
  // customer.name = faker.name.lastName('male');
  // customer.lastName = faker.name.firstName('male');
  // customer.phone = faker.phone.number();
  // customer.address = faker.address.ordinalDirection();
  // customer.avatar = faker.image.avatar();
  // customer.limit = parseInt(faker.finance.amount());
  // customer.isActive = true;
  // customer.createdAt = new Date().toTimeString();
  // customer.updatedAt = new Date().toTimeString();

  customer.order = 1;
  customer.nickName = 'Jhon';
  customer.name = 'name ';
  customer.lastName = 'lastName ';
  customer.phone = 'phone ';
  customer.address = 'address ';
  customer.avatar = 'avatar ';
  customer.limit = 1;
  customer.isActive = true;
  customer.invoices = [];
  customer.createdAt = new Date().toTimeString();
  customer.updatedAt = new Date().toTimeString();
  return customer;
});
