import { Router } from "express";
import { getProducts } from "src/controllers";
import { catchAsync } from "src/helpers/catchAsync";

class ProductRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/", catchAsync(getProducts));
  }
}

export default new ProductRouter().router;
