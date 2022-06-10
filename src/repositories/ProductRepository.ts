import { AppError } from "src/helpers/appError";
import { EntityRepository, Repository } from "typeorm";
import { Product } from "../models";


@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProductByFilter(filter:string):Promise<Product[]> {
    return this.createQueryBuilder("product").where("name ILIKE :filter || '%'", { filter }).getMany();
  }

  async findById(productId:string):Promise<Product>{
    const product = await this.findOne({id: productId});

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}