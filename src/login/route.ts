import { Router } from "express";
import { LoginController } from "./LoginController";
const router = Router();

router.post("/login", LoginController);

export default router;
