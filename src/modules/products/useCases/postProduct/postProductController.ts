import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isNewProduct } from "../../../../models/IProduct";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { postProduct } from "./postProductUseCase";

export const postProductController = async (req: Request, res: Response) => {
  console.log("/products foi chamado... (post)");
  try {
    const product = req.body.product;
    if (!req.user || !req.body.product || !isNewProduct(product)) {
      throw new Error("Informações inválidas.");
    }
    const username = req.user.username;

    const httpStatus = await postProduct({ username, product });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Produto cadastrado com sucesso." });
  } catch (error) {
    console.log("/products (post) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
