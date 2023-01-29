import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { logger } from "../../../../shared/services/pino/logger";
import { getPerson } from "./getPersonUseCase";

export const getPersonController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
  try {
    if (!req.user || !Number.parseInt(req.params.personId)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;
    const personId = Number.parseInt(req.params.personId);

    const person = await getPerson({ username, personId });
    res.status(EnumHttpStatus.OK).json({ person });
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
