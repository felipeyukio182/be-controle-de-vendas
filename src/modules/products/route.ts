import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { deleteProductController } from "./useCases/deleteProduct/deleteProductController";
import { getProductController } from "./useCases/getProduct/getProductController";
import { getProductsController } from "./useCases/getProducts/getProductsController";
import { postProductController } from "./useCases/postProduct/postProductController";
import { putProductController } from "./useCases/putProduct/putProductController";

const router = Router();

router.get("/", authMid, getProductsController);
router.get("/:productId", authMid, getProductController);
router.post("/", authMid, postProductController);
router.put("/:productId", authMid, putProductController);
router.delete("/:productId", authMid, deleteProductController);

export default router;
