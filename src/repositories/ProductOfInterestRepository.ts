import { EntityRepository, Repository } from "typeorm";
import { ProductOfInterest } from "../models";


@EntityRepository(ProductOfInterest)
export class ProductOfInterestRepository extends Repository<ProductOfInterest> {
  async findByUser(userId:string):Promise<ProductOfInterest[]> {
    return this.createQueryBuilder("product_of_interest").where("product_of_interest.user_id = :userId", { userId }).getMany();
  }
}