import { Credit } from 'src/credits/entities/credit.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Percent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fee: number;
  @Column()
  rate: number;
  @OneToMany(() => Credit, (credit) => credit.percent)
  credits: Credit[];
}
