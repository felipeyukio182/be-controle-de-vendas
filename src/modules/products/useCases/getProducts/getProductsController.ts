import { Request, Response } from "../../../../models/IExpressExtendedTypes";
import { EnumHttpStatus } from "../../../../shared/enums/EnumHttpStatus";
import { logger } from "../../../../shared/services/pino/logger";
import { getProducts } from "./getProductsUseCase";

export const getProductsController = async (req: Request, res: Response) => {
  logger.infoController(req.originalUrl, req.method);
  try {
    if (!req.user) {
      throw new Error("Sem informações do usuario.");
    }
    const username = req.user.username;
    const products = await getProducts(username);
    res.status(EnumHttpStatus.OK).json({ products });
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
