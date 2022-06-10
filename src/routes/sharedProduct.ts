import { Router } from "express";
import { createSharedProduct, deleteSharedProduct, getSharedProducts } from "../controllers";
import { catchAsync } from "../helpers/catchAsync";
import { protect } from "../middlewares/auth";

class SharedProductRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerControllers();
  }

  private registerControllers(): void {
    this.router.get("/",  catchAsync(protect),catchAsync(getSharedProducts));
    this.router.post("/",  catchAsync(protect),catchAsync(createSharedProduct));
    this.router.delete("/:id",  catchAsync(protect),catchAsync(deleteSharedProduct));
  }
}

export default new SharedProductRouter().router;