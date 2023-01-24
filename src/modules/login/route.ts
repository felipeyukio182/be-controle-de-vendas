import { Router } from "express";
import { loginController } from "./loginController";
const router = Router();

router.post("/login", loginController);

export default router;
