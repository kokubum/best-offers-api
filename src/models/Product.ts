import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Stablishment } from "./Stablishment";
import { User } from "./User";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!:number;

  @ManyToOne(()=> Stablishment,stablishment=>stablishment.products,{ onDelete: "CASCADE", nullable: true })
  stablishment?:Stablishment;

  @ManyToOne(()=> User,user=>user.sharedProducts,{ onDelete: "CASCADE", nullable: true })
  user?:User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
