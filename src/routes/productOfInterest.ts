import { Router } from "express";
import { createProductOfInterest, getProductsOfInterest } from "../controllers";
import { catchAsync } from "../helpers/catchAsync";
import { protect } from "../middlewares/auth";

class ProductOfInterestRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/", catchAsync(protect),catchAsync(getProductsOfInterest));
    this.router.post("/", catchAsync(protect),catchAsync(createProductOfInterest));

  }
}

export default new ProductOfInterestRouter().router;