import { IPerson } from "./IPerson";
import { IProductForSale } from "./IProductForSale";

export interface ISale {
  id: number;
  date: string;
  person: IPerson;
  products: IProductForSale[];
}
