import { Credit } from '../../credits/entities/credit.entity';
import { InvoiceData } from './04_invoice.data';
import { PercentData } from './001_percent.data';

export const CreditData: Credit[] = [
  {
    fee: 0,
    rate: 0,
    isActive: true,
    invoice: InvoiceData[0],
    percent: PercentData[0],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    fee: 0.1,
    rate: 0,
    isActive: true,
    invoice: InvoiceData[1],
    percent: PercentData[1],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    fee: 0.2,
    rate: 0,
    isActive: true,
    invoice: InvoiceData[2],
    percent: PercentData[2],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
