import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { auth } from "./config/auth";

export const LoginController = (req: Request, res: Response) => {
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
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro inesperado" });
    }
  }
};
