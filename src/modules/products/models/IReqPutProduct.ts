import { IProduct } from "../../../models/IProduct";

export interface IReqPutProduct {
  username: string;
  product: IProduct;
  productId: number;
}
