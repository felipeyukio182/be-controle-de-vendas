import { IProduct } from "./IProduct";

export interface IProductForSale extends IProduct {
  discount: number;
  amount: number;
}
