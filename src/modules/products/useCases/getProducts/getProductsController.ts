import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getProducts } from "./getProductsUseCase";

export const getProductsController = async (req: Request, res: Response) => {
  console.log("/products foi chamado...");
  try {
    if (!req.user) {
      throw new Error("Sem informações do usuario.");
    }
    const username = req.user.username;
    const products = await getProducts(username);
    res.status(EnumHttpStatus.OK).json({ products });
  } catch (error) {
    console.log("/products error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
