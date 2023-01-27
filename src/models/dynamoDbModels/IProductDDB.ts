import { IProduct } from "../IProduct";
import { IDynamoDbItem } from "./IDynamoDbItem";

export interface IProductDDB extends IDynamoDbItem {
  product: IProduct;
}
