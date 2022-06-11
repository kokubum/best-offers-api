import { Router } from "express";
import { createProductOfInterest, getProductsOfInterest, updateAlertProductOfInterest } from "../controllers";
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
    this.router.put("/:id/alertdown", catchAsync(protect),catchAsync(updateAlertProductOfInterest));
  }
}

export default new ProductOfInterestRouter().router;