import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getPerson } from "./getPersonUseCase";

export const getPersonController = async (req: Request, res: Response) => {
  console.log("/people/:personId foi chamado...");
  try {
    if (!req.user || !Number.parseInt(req.params.personId)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;
    const personId = Number.parseInt(req.params.personId);

    const person = await getPerson({ username, personId });
    res.status(EnumHttpStatus.OK).json({ person });
  } catch (error) {
    console.log("/people/:id error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
