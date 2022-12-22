import { Order } from '../models/order.entity';
import { MemberData } from './021_member.data';
import { CustomerData } from './031_customer.data';

export const OrderData: Order[] = [
  {
    comment: 'Primer factura',
    customer: CustomerData[0],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
  },
  {
    comment: 'Primer factura de credito',
    customer: CustomerData[1],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
  },
  {
    comment: 'Segunda ffactura de credito',
    customer: CustomerData[2],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
  },
];
