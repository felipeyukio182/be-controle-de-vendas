import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { logger } from "../../../../shared/services/pino/logger";
import { deleteProduct } from "./deleteProductUseCase";

export const deleteProductController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
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
    if (error instanceof Error) {
      logger.errorController(req.originalUrl, req.method, error.message);
      res.status(EnumHttpStatus.Unauthorized).json({ error: error.message });
    } else {
      logger.errorController(req.originalUrl, req.method);
      res
        .status(EnumHttpStatus.InternalServer)
        .json({ error: "Erro inesperado" });
    }
  }
};
