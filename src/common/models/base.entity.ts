import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate } from 'class-validator';

export class Base {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdAt: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    onUpdate: 'NOW()',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: string;

  @Column({ nullable: false, default: true })
  @IsBoolean()
  isActive: boolean;
}
