import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getPeople } from "./getPeopleUseCase";

export const getPeopleController = async (req: Request, res: Response) => {
  console.log("/people foi chamado...");
  try {
    if (!req.user) {
      throw new Error("Sem informações do usuario.");
    }
    const username = req.user.username;
    const people = await getPeople(username);
    res.status(EnumHttpStatus.OK).json({ people });
  } catch (error) {
    console.log("/people error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
