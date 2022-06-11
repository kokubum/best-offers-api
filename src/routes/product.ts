import { Router } from "express";
import { getProducts, updateProduct } from "../controllers";
import { catchAsync } from "../helpers/catchAsync";

class ProductRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/", catchAsync(getProducts));
    this.router.put("/:id",catchAsync(updateProduct));
  }
}

export default new ProductRouter().router;
