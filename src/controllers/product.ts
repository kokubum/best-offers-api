import { Request, Response } from "express";
import { SearchBody } from "src/@types/product.types";

export async function getProducts(req: Request, res: Response) {
  const { ctx } = req;

  const requiredFields = ["search"];
  const {search} = ctx.services.validateService.requestBody<SearchBody>(req.body, requiredFields);

  const products = await ctx.db.productRepository.findProductByFilter(search);

  return res.status(200).send({
    status: "success",
    data: {
      products,
      length: products.length
    }
  });
}