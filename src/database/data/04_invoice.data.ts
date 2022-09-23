import { Invoice } from '../../invoices/entities/invoice.entity';
import { CustomerData } from './01_customer.data';

export const InvoiceData: Invoice[] = [
  {
    comment: 'Primer factura',
    customer: CustomerData[0],
    invoiceDetails: [],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    comment: 'Primer factura de credito',
    customer: CustomerData[1],
    invoiceDetails: [],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    comment: 'Segunda ffactura de credito',
    customer: CustomerData[2],
    invoiceDetails: [],
    isAnulated: false,
    isCompleted: false,
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
