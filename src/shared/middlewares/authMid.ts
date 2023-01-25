import { NextFunction } from "express";
import { verifyJwtToken } from "../services/jwt/jwt";
import { EnumHttpStatus } from "../enums/EnumHttpStatus";
import { Request, Response } from "../../models/IExpressExtendedTypes";

/** Utilizar types do IExtendedExpressTypes em endpoints que utilizarem esse middleware */
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
    };

    next();
  } catch (error) {
    console.log("authMid error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
