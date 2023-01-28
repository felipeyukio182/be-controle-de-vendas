import { IProduct } from "../../../../models/IProduct";
import { IReqGetProduct } from "../../models/IReqGetProduct";
import { getProductDb } from "../../repositories/productsRepository";

export const getProduct = async ({
  username,
  productId,
}: IReqGetProduct): Promise<IProduct | null> => {
  const product = await getProductDb({ username, productId });
  return product;
};
