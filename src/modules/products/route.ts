import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getProductController } from "./useCases/getProduct/getProductController";
import { getProductsController } from "./useCases/getProducts/getProductsController";
import { postProductController } from "./useCases/postProduct/postProductController";

const router = Router();

router.get("/", authMid, getProductsController);
router.get("/:productId", authMid, getProductController);
router.post("/", authMid, postProductController);

export default router;
