import { Request, Response } from "express";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { IReqLogin } from "../../models/IReqLogin";
import { findUser } from "./loginUseCase";

export const loginController = async (req: Request, res: Response) => {
  console.log("auth/login foi chamado...");
  try {
    const { email, password } = req.body as IReqLogin;

    if (!email || !password) {
      throw new Error("Credenciais inválidas!");
    }

    const userAuthenticated = await findUser({ email, password });

    if (!userAuthenticated) {
      throw new Error("Usuario ou senha inválidos!");
    }

    res.status(EnumHttpStatus.OK).json({ ...userAuthenticated });
  } catch (error) {
    console.log("auth/login error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
