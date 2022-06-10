import { Router } from "express";
import { createSharedProduct, deleteSharedProduct, getSharedProducts } from "src/controllers";
import { catchAsync } from "src/helpers/catchAsync";

class SharedProductRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/", catchAsync(getSharedProducts));
    this.router.post("/", catchAsync(createSharedProduct));
    this.router.delete("/:id", catchAsync(deleteSharedProduct));
  }
}

export default new SharedProductRouter().router;