import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { getProduct } from "./getProductUseCase";

export const getProductController = async (req: Request, res: Response) => {
  console.log("/product/:productId foi chamado...");
  try {
    if (!req.user || !Number.parseInt(req.params.productId)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;
    const productId = Number.parseInt(req.params.productId);

    const product = await getProduct({ username, productId });
    res.status(EnumHttpStatus.OK).json({ product });
  } catch (error) {
    console.log("/product/:productId error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
