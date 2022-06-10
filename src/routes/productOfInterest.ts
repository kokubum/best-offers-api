import { Router } from "express";
import { createProductOfInterest, getProductsOfInterest } from "src/controllers";
import { catchAsync } from "src/helpers/catchAsync";

class ProductOfInterestRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/", catchAsync(getProductsOfInterest));
    this.router.post("/", catchAsync(createProductOfInterest));

  }
}

export default new ProductOfInterestRouter().router;