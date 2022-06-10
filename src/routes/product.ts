import { Router } from "express";
import { getProducts } from "../controllers";
import { catchAsync } from "../helpers/catchAsync";

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
