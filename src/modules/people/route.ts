import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getPeopleController } from "./useCases/getPeople/getPeopleController";

const router = Router();

router.get("/", authMid, getPeopleController);

export default router;
