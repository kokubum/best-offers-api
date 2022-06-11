import { EntityRepository, Repository } from "typeorm";
import { AppError } from "../helpers/appError";
import { ProductOfInterest } from "../models";


@EntityRepository(ProductOfInterest)
export class ProductOfInterestRepository extends Repository<ProductOfInterest> {
  async findByUser(userId:string):Promise<ProductOfInterest[]> {
    return this.createQueryBuilder("product_of_interest").where("product_of_interest.user_id = :userId", { userId }).getMany();
  }

  async findByUserAndId(userId:string,id:string):Promise<ProductOfInterest> {
    const productOfInterest = await this.createQueryBuilder("product_of_interest").where("product_of_interest.user_id = :userId", { userId }).andWhere("product_of_interest.id = :id", { id }).getOne();
    
    if (!productOfInterest) {
      throw new AppError("Product of interest not found", 404);
    }

    return productOfInterest;
  }

  async findByProduct(productId:string):Promise<ProductOfInterest[]> {
    return this.createQueryBuilder("product_of_interest").where("product_of_interest.product_id = :productId", { productId }).getMany();
  }

}