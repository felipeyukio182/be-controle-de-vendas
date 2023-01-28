import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getProductsController } from "./useCases/getProducts/getProductsController";

const router = Router();

router.get("/", authMid, getProductsController);

export default router;
