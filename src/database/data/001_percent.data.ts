import { Percent } from '../../percents/entities/percent.entity';

export const PercentData: Percent[] = [
  {
    fee: 4,
    rate: 0.2,
    isActive: true,
    createdAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
    updatedAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
  },
  {
    fee: 5,
    rate: 0.3,
    isActive: true,
    createdAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
    updatedAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
  },
  {
    fee: 6,
    rate: 0.4,
    isActive: true,
    createdAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
    updatedAt: new Date('2021-03-23 18:32:47')
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
  },
];
