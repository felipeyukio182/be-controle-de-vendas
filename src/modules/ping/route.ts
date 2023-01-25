import { Router } from "express";
import { EnumHttpStatus } from "../../shared/enums/EnumHttpStatus";
const router = Router();

router.get("/", (req, res) =>
  res.status(EnumHttpStatus.OK).json({
    msg: "Serviço ativo!",
  })
);

export default router;
