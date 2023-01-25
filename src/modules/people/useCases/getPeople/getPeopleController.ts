import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getPeople } from "./getPeopleUseCase";

export const getPeopleController = (req: Request, res: Response) => {
  console.log("/people foi chamado...");
  try {
    const people = getPeople(req.user);
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
