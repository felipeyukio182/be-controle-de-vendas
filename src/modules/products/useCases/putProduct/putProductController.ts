import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isProduct } from "../../../../models/IProduct";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { putProduct } from "./putProductUseCase";

export const putProductController = async (req: Request, res: Response) => {
  console.log("/product/:productId foi chamado... (put)");
  try {
    const product = req.body.product;
    if (
      !req.user ||
      !req.body.product ||
      !isProduct(product) ||
      !Number.parseInt(req.params.productId)
    ) {
      throw new Error("Informações inválidas.");
    }

    const username = req.user.username;
    const productId = Number.parseInt(req.params.productId);

    if (product.id !== productId) {
      throw new Error("Ids incompativeis.");
    }

    const httpStatus = await putProduct({ username, product, productId });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Produto atualizado com sucesso." });
  } catch (error) {
    console.log("/product/:productId (put) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
