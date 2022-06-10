import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { SharedProduct } from "../models";


@EntityRepository(SharedProduct)
export class SharedProductRepository extends Repository<SharedProduct> {
  async findByUser(userId:string):Promise<SharedProduct[]> {
    return this.createQueryBuilder("shared_product").where("shared_product.user_id = :userId", { userId }).getMany();
  }

  async removeByUserAndId(userId:string,sharedProductId:string):Promise<DeleteResult> {
    return this.delete({userId,id:sharedProductId});
  }
}