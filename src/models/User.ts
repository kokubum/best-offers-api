import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductOfInterest, SharedProduct } from ".";

@Entity({ name: "user" })
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

  @OneToMany(() => SharedProduct, sharedProduct => sharedProduct.user)
  sharedProducts!:SharedProduct[];

  @OneToMany(() => ProductOfInterest, productOfInterest => productOfInterest.user)
  productsOfInterest!:ProductOfInterest[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
