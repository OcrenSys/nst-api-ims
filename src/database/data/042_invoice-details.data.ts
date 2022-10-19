import { InvoicesDetail } from 'src/api/invoices-details/entities/invoices-detail.entity';
import { ProductData } from './033_product.data';
import { InvoiceData } from './041_invoice.data';

export const InvoiceDetailsData: InvoicesDetail[] = [
  {
    amount: 1,
    cost: 450,
    invoice: InvoiceData[0],
    price: 700,
    product: ProductData[0],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    amount: 2,
    cost: 450,
    invoice: InvoiceData[0],
    price: 700,
    product: ProductData[1],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    amount: 3,
    cost: 450,
    invoice: InvoiceData[1],
    price: 700,
    product: ProductData[2],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
