import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product, User } from "./";

@Entity({ name: "product_of_interest" })
export class ProductOfInterest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  startPrice!: number;

  @Column()
  endPrice!:number;

  @OneToOne(() => Product, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  product!:Product;

  @ManyToOne(()=> User,user=>user.productsOfInterest,{ onDelete: "CASCADE", nullable: false })
  user!:User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}