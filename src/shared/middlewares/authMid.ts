import { NextFunction } from "express";
import { verifyJwtToken } from "../services/jwt/jwt";
import { EnumHttpStatus } from "../enums/EnumHttpStatus";
import { Request, Response } from "../../models/IExpressExtendedTypes";
import { logger } from "../services/pino/logger";

/**
 * Valida autenticação do usuario e adiciona informações de user na request.
 * Utilizar types do IExtendedExpressTypes em endpoints que utilizarem esse middleware. */
export const authMid = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Token inválido.");
    }

    const [, token] = authorization.split("Bearer ");
    const tokenPayload = verifyJwtToken(token);

    req.user = {
      id: tokenPayload.id,
      email: tokenPayload.email,
      username: tokenPayload.username,
      name: tokenPayload.name,
    };

    next();
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
