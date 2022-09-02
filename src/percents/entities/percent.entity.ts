import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Percent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fee: number;
  @Column()
  rate: number;
  @OneToMany(() => Invoice, (invoice) => invoice.percent)
  invoices: Invoice[];
}
