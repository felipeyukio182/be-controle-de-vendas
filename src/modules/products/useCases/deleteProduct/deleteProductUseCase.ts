import { IReqDeleteProduct } from "../../models/IReqDeleteProduct";
import { deleteProductDb } from "../../repositories/productsRepository";

export const deleteProduct = async ({
  username,
  productId,
}: IReqDeleteProduct): Promise<number | null> => {
  const httpStatus = await deleteProductDb({ username, productId });
  return httpStatus;
};
