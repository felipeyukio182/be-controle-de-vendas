import { INewProduct } from "../../../models/IProduct";

export interface IReqPostProduct {
  username: string;
  product: INewProduct;
}
