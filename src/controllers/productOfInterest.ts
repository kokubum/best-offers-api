import { Request, Response } from "express";
import { CreateProductOfInterestBody } from "src/@types/productOfInterest";

export async function getProductsOfInterest(req: Request, res: Response) {
  const { ctx } = req;
  const { user } = ctx.signature!;

  const productsOfInterest = await ctx.db.productOfInterestRepository.findByUser(user.id);

  return res.status(200).send({
    status: "success",
    data: {
      productsOfInterest,
      length: productsOfInterest.length
    }
  });
}

export async function createProductOfInterest(req: Request, res: Response) {
  const { ctx } = req;
  const { user } = ctx.signature!;
  
  const requiredFields = ["productId", "startPrice", "endPrice","activateForThirdUsers"];

  const createBody = ctx.services.validateService.requestBody<CreateProductOfInterestBody>(req.body, requiredFields);

  const product = await ctx.db.productRepository.findById(createBody.productId);

  const productOfInterest = await ctx.db.productOfInterestRepository.save({
    startPrice: createBody.startPrice,
    endPrice: createBody.endPrice,
    activateForThirdUsers: createBody.activateForThirdUsers,
    product,
    user,
    alert: product.price >= createBody.startPrice && product.price <= createBody.endPrice ? true:false
  });

  return res.status(201).send({
    status: "success",
    data: {
      productOfInterest,
    }
  });
}

export async function updateAlertProductOfInterest(req:Request,res: Response){
  const { ctx } = req;
  const { user } = ctx.signature!;

  const { id } = req.params;

  const productOfInterest = await ctx.db.productOfInterestRepository.findByUserAndId(user.id,id);

  productOfInterest.alert = false;

  await ctx.db.productOfInterestRepository.save(productOfInterest);

  return res.status(200).send({
    status: "success",
    data: null
  });
}