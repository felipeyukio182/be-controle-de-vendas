import { Router } from "express";
import { LoginController } from "./LoginController";
const router = Router();

router.get("/login", LoginController);

export default router;
