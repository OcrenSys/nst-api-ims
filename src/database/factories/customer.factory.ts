import { setSeederFactory } from 'typeorm-extension';
import { Customer } from '../models/customer.entity';

export default setSeederFactory(Customer, () => {
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
  return customer;
});
