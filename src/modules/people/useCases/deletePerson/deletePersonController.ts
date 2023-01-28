import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { deletePerson } from "./deletePersonUseCase";

export const deletePersonController = async (req: Request, res: Response) => {
  console.log("/people foi chamado... (delete)");
  try {
    if (!req.user || !Number.parseInt(req.params.personId)) {
      throw new Error("Informações inválidas.");
    }

    const username = req.user.username;
    const personId = Number.parseInt(req.params.personId);

    const httpStatus = await deletePerson({ username, personId });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Pessoa excluida com sucesso." });
  } catch (error) {
    console.log("/people (delete) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
