import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @Column()
  order: number;
  @Column()
  avatar: string;
  @Column()
  limit: string;
  @OneToMany(() => Invoice, (invoice) => invoice.percent)
  invoice: Invoice[];
}
