import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product, User } from ".";

@Entity({ name: "shared_product" })
export class SharedProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  stablishmentName!:string;

  @OneToOne(() => Product, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  product!:Product;

  @ManyToOne(()=> User,user=>user.sharedProducts,{ onDelete: "CASCADE", nullable: false })
  user!:User;

  @Column()
  userId!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
