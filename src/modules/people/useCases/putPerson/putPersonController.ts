import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isPerson } from "../../../../models/IPerson";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { putPerson } from "./putPersonUseCase";

export const putPersonController = async (req: Request, res: Response) => {
  console.log("/people foi chamado... (put)");
  try {
    const person = req.body.person;
    if (
      !req.user ||
      !req.body.person ||
      !isPerson(person) ||
      !Number.parseInt(req.params.personId)
    ) {
      throw new Error("Informações inválidas.");
    }

    const username = req.user.username;
    const personId = Number.parseInt(req.params.personId);

    if (person.id !== personId) {
      throw new Error("Ids incompativeis.");
    }

    const httpStatus = await putPerson({ username, person, personId });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Pessoa atualizada com sucesso." });
  } catch (error) {
    console.log("/people (put) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
