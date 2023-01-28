import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getPeopleController } from "./useCases/getPeople/getPeopleController";
import { getPersonController } from "./useCases/getPerson/getPersonController";
import { postPersonController } from "./useCases/postPerson/postPersonController";
import { putPersonController } from "./useCases/putPerson/putPersonController";

const router = Router();

router.get("/", authMid, getPeopleController);
router.get("/:personId", authMid, getPersonController);
router.post("/", authMid, postPersonController);
router.put("/:personId", authMid, putPersonController);

export default router;
