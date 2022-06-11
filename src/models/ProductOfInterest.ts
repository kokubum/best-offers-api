import {
  Column,
  Entity, ManyToOne, PrimaryGeneratedColumn,
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

  @Column({
    default:false,
    nullable:false
  })
  activateForThirdUsers!:boolean;

  @Column({
    default:false,
    nullable:false
  })
  alert!:boolean;

  @ManyToOne(() => Product, { onDelete: "CASCADE", nullable: false })
  product!:Product;

  @ManyToOne(()=> User,user=>user.productsOfInterest,{ onDelete: "CASCADE", nullable: false })
  user!:User;

  @Column()
  userId!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}