import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isNewPerson } from "../../../../models/IPerson";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { logger } from "../../../../shared/services/pino/logger";
import { postPerson } from "./postPersonUseCase";

export const postPersonController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
  try {
    const person = req.body.person;
    if (!req.user || !req.body.person || !isNewPerson(person)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;

    const httpStatus = await postPerson({ username, person });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Pessoa cadastrada com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      logger.errorController(req.originalUrl, req.method, error.message);
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      logger.errorController(req.originalUrl, req.method);
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
