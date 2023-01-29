import { Request, Response } from "express";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { IReqLogin } from "../../models/IReqLogin";
import { findUser } from "./loginUseCase";
import { logger } from "../../../../shared/services/pino/logger";

export const loginController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
  try {
    const { username, password } = req.body as IReqLogin;

    if (!username || !password) {
      throw new Error("Credenciais inválidas!");
    }

    const userAuthenticated = await findUser({ username, password });

    if (!userAuthenticated) {
      throw new Error("Usuario ou senha inválidos!");
    }

    res.status(EnumHttpStatus.OK).json({ ...userAuthenticated });
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
