import { Invoice } from '../../api/invoices/entities/invoice.entity';
import { MemberData } from './021_member.data';
import { CustomerData } from './031_customer.data';

export const InvoiceData: Invoice[] = [
  {
    comment: 'Primer factura',
    customer: CustomerData[0],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    comment: 'Primer factura de credito',
    customer: CustomerData[1],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    comment: 'Segunda ffactura de credito',
    customer: CustomerData[2],
    member: MemberData[0],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
