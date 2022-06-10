import { Request, Response } from "express";
import { CreateSharedProductBody } from "src/@types/product.types";

export async function getSharedProducts(req: Request, res: Response){
  const { ctx } = req;
  const { user } = ctx.signature!;

  const sharedProducts = await ctx.db.sharedProductRepository.findByUser(user.id);

  return res.status(200).send({
    status: "success",
    data: {
      sharedProducts,
      length: sharedProducts.length
    }
  });
}

export async function deleteSharedProduct(req: Request, res: Response){
  const { ctx } = req;
  const { user } = ctx.signature!;

  const { id } = req.params;

  await ctx.db.sharedProductRepository.removeByUserAndId(user.id,id);

  return res.status(204).send({
    status: "success",
    data: null
  });

}

export async function createSharedProduct(req: Request, res: Response) {
  const { ctx } = req;
  const { user } = ctx.signature!;
  
  const requiredFields = ["name", "price", "stablishmentName"];

  const createBody = ctx.services.validateService.requestBody<CreateSharedProductBody>(req.body, requiredFields);

  const stablishment = await ctx.db.stablishmentRepository.findByName(createBody.stablishmentName);

  const product = await ctx.db.productRepository.save({
    name:createBody.name,
    price:createBody.price,
    stablishment:stablishment ? stablishment : undefined,
  });

  const sharedProduct = await ctx.db.sharedProductRepository.save({
    user,
    product,
    stablishmentName: createBody.stablishmentName
  });

  return res.status(201).send({
    status: "success",
    data: {
      sharedProduct,
    }
  });
}