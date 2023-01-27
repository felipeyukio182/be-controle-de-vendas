import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getPeopleController } from "./useCases/getPeople/getPeopleController";
import { getPersonController } from "./useCases/getPerson/getPersonController";

const router = Router();

router.get("/", authMid, getPeopleController);
router.get("/:personId", authMid, getPersonController);

export default router;
