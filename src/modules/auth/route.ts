import { Router } from "express";
import { loginController } from "./useCases/login/loginController";
import { refreshTokenController } from "./useCases/refreshToken/refreshTokenController";
const router = Router();

router.post("/login", loginController);

router.post("/refresh", refreshTokenController);

export default router;
