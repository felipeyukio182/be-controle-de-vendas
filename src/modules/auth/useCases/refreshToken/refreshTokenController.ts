import { Request, Response } from "express";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getNewTokens } from "./refreshTokenUseCase";

export const refreshTokenController = async (req: Request, res: Response) => {
  console.log("/auth/refresh foi chamado...");
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
    console.log("/auth/refresh error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.NotAcceptable).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
