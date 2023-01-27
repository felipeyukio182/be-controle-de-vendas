import { Router } from "express";
import { authMid } from "../../shared/middlewares/authMid";
import { getPeopleController } from "./useCases/getPeople/getPeopleController";
import { getPersonController } from "./useCases/getPerson/getPersonController";
// import { postPersonController } from "./useCases/postPerson/postPersonController";

const router = Router();

router.get("/", authMid, getPeopleController);
router.get("/:personId", authMid, getPersonController);
// router.post("/", authMid, postPersonController);

export default router;
