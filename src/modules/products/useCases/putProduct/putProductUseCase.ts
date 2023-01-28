import { IReqPutProduct } from "../../models/IReqPutProduct";
import { putProductDb } from "../../repositories/productsRepository";

export const putProduct = async ({
  username,
  product,
  productId,
}: IReqPutProduct): Promise<number | null> => {
  const httpStatus = await putProductDb({ username, product, productId });
  return httpStatus;
};
