import { Router } from "express";
import { loginController } from "./useCases/login/loginController";
const router = Router();

router.post("/login", loginController);

export default router;
