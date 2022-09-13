import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nickName: string;
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
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
