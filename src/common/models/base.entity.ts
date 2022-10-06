import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class Base {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    onUpdate: 'NOW()',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;
}
