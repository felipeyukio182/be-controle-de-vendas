import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { deleteProduct } from "./deleteProductUseCase";

export const deleteProductController = async (req: Request, res: Response) => {
  console.log("/products/:productId foi chamado... (delete)");
  try {
    if (!req.user || !Number.parseInt(req.params.productId)) {
      throw new Error("Informações inválidas.");
    }

    const username = req.user.username;
    const productId = Number.parseInt(req.params.productId);

    const httpStatus = await deleteProduct({ username, productId });
    res
      .status(EnumHttpStatus.OK)
      .json({ httpStatus, msg: "Produto excluido com sucesso." });
  } catch (error) {
    console.log("/products/:productId (delete) error: ", error);
    if (error instanceof Error) {
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
