import { Credit } from '../models/credit.entity';
import { OrderData } from './041_order.data';
import { PercentData } from './042_percent.data';

export const CreditData: Credit[] = [
  {
    fee: 0,
    rate: 0,
    isActive: true,
    order: OrderData[0],
    percent: PercentData[0],
    
  },
  {
    fee: 0.1,
    rate: 0,
    isActive: true,
    order: OrderData[1],
    percent: PercentData[1],
    
  },
  {
    fee: 0.2,
    rate: 0,
    isActive: true,
    order: OrderData[2],
    percent: PercentData[2],
    
  },
];
