import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";
import { ProductOfInterest } from "./ProductOfInterest";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column({
    default: false,
  })
  active!: boolean;

  @OneToMany(() => Product, product => product.user)
  sharedProducts!:Product[];

  @OneToMany(() => ProductOfInterest, productOfInterest => productOfInterest.user)
  productsOfInterest!:ProductOfInterest[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
