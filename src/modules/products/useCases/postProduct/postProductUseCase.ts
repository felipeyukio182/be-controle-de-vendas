import { IReqPostProduct } from "../../models/IReqPostProduct";
import { postProductDb } from "../../repositories/productsRepository";

export const postProduct = async ({
  username,
  product,
}: IReqPostProduct): Promise<number | null> => {
  const httpStatus = await postProductDb({ username, product });
  return httpStatus;
};
