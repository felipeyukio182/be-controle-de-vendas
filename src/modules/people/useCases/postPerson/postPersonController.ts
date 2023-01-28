import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isNewPerson } from "../../../../models/IPerson";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { postPerson } from "./postPersonUseCase";

export const postPersonController = async (req: Request, res: Response) => {
  console.log("/people foi chamado... (post)");
  try {
    const person = req.body.person;
    if (!req.user || !req.body.person || !isNewPerson(person)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;

    const httpStatus = await postPerson({ username, person });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Pessoa cadastrada com sucesso." });
  } catch (error) {
    console.log("/people (post) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
