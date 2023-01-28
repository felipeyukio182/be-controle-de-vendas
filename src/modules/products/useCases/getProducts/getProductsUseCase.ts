import { IProduct } from "../../../../models/IProduct";
import { getProductsDb } from "../../repositories/productsRepository";

export const getProducts = async (username: string): Promise<IProduct[]> => {
  const products = await getProductsDb(username);
  return products;
};
