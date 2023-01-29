import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { isNewProduct } from "../../../../models/IProduct";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { logger } from "../../../../shared/services/pino/logger";
import { postProduct } from "./postProductUseCase";

export const postProductController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
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
