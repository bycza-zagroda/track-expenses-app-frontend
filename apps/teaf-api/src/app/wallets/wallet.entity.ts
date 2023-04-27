import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public creationDate: Date;
}
