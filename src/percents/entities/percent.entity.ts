import { Credit } from '../../credits/entities/credit.entity';
import { Base } from '../../utilities/classes/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Percent extends Base {
  @Column()
  fee: number;
  @Column()
  rate: number;
  @OneToMany(() => Credit, (credit) => credit.percent, { nullable: true })
  credits?: Credit[];
}
