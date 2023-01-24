import { Router } from "express";
const router = Router();

router.get("/teste", (req, res) => res.send("teste"));

export default router;
