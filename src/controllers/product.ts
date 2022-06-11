import { Request, Response } from "express";
import { SearchBody } from "../@types/product.types";
import { AppError } from "../helpers/appError";

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

export async function updateProduct(req: Request, res: Response) {
  const { ctx } = req;
  const { id } = req.params;

  const product = await ctx.db.productRepository.findById(id);
  const {price} = req.body;

  if (!price || isNaN(price) || price % 1!==0) {
    throw new AppError("Price with invalid forma",400,{
      price: "Price should be a positive integer"
    })
  }

  product.price = price;

  await ctx.db.productRepository.save(product);

  const productsOfInterest = await ctx.db.productOfInterestRepository.findByProduct(product.id);

  await Promise.all(productsOfInterest.map(pof=>{
    if(product.price>=pof.startPrice && product.price<=pof.endPrice){
      pof.alert = true;
      return ctx.db.productOfInterestRepository.save(pof);
    }
  }));

  return res.status(200).send({
    status: "success",
    data: null
  });
}