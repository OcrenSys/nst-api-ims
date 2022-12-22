import { Column, Entity, OneToMany } from 'typeorm';
import { Credit } from './credit.entity';
import { Base } from './base.entity';

@Entity()
export class Percent extends Base {
  @Column()
  fee: number;

  @Column()
  rate: number;

  @OneToMany(() => Credit, (credit) => credit.percent, { nullable: true })
  credits?: Credit[];
}
