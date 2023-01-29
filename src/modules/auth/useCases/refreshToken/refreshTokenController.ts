import { Request, Response } from "express";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getNewTokens } from "./refreshTokenUseCase";
import { logger } from "../../../../shared/services/pino/logger";

export const refreshTokenController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
  try {
    const authorization = req.headers.authorization;
    const refreshToken: string | undefined = req.body.refreshToken;
    if (!authorization || !refreshToken) {
      throw new Error("Token inválido.");
    }
    const [, token] = authorization.split("Bearer ");

    const newTokens = getNewTokens({ token, refreshToken });

    res.status(EnumHttpStatus.OK).json({ newTokens });
  } catch (error) {
    if (error instanceof Error) {
      logger.errorController(req.originalUrl, req.method, error.message);
      res.status(EnumHttpStatus.NotAcceptable).json({ error: error.message });
    } else {
      logger.errorController(req.originalUrl, req.method);
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
