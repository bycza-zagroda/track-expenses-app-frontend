import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from './transactions.constants';
import { Category } from '../categories/category.entity';
import { Wallet } from '../wallets/wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: true,
  })
  public description: string;

  @Column()
  public date: Date;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  public type: TransactionType;

  @Column({
    type: 'float',
  })
  public amount: number;

  @ManyToOne(() => Category, {
    nullable: true,
  })
  public category: Category;

  @ManyToOne(() => Wallet)
  public wallet: Category;
}
