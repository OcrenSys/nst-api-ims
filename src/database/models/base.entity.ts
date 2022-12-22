import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate } from 'class-validator';

export class Base {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsDate()
  @CreateDateColumn()
  createAt?: Date;

  @Column()
  @IsDate()
  @UpdateDateColumn()
  updateAt?: Date;

  @Column()
  @IsDate()
  @DeleteDateColumn()
  removeAt?: Date;

  @Column({ nullable: false, default: true })
  @IsBoolean()
  isActive?: boolean;
}
