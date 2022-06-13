import { Request, Response } from "express";
import { generateMockProductList } from "../../tests/__mocks__/product";
import { generateMockStablishmentList } from "../../tests/__mocks__/stablishment";


export async function populateStablishment(req: Request, res: Response){
  const { ctx } = req;

  const {stablishmentCount,productForEachStablishmentCount} = req.body;

  const mockStablishments = generateMockStablishmentList({count:stablishmentCount ?? 1});
  await ctx.db.stablishmentRepository.save(mockStablishments);
  await Promise.all(mockStablishments.map(async stablishment => {
    const mockProducts = (generateMockProductList({count:productForEachStablishmentCount ?? 1})).map(product=>{
      product.stablishment = stablishment;
      return product;
    });
    return ctx.db.productRepository.save(mockProducts);
  }));


  return res.status(200).send({
    status: "success",
    data: null
  });
}