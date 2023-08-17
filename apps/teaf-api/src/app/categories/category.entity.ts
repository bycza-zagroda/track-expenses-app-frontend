import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../transactions/transactions.constants';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  public type: TransactionType;
}
