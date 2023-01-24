import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { EnumHttpStatus } from "../../shared/enum/EnumHttpStatus";
import { auth } from "./config/auth";

export const loginController = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Credenciais inválidas!");
    }

    const jwt = sign({ email, password }, auth.jwt.secret, {
      expiresIn: auth.jwt.expiresIn,
    });

    res.status(200).json({ email: email, token: jwt });
  } catch (error) {
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
