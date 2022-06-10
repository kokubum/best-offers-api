import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { SharedProduct } from "./SharedProduct";
import { Stablishment } from "./Stablishment";

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

  @OneToOne(()=> SharedProduct,sharedProduct=>sharedProduct.product,{ nullable: true })
  sharedProduct?:SharedProduct;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
