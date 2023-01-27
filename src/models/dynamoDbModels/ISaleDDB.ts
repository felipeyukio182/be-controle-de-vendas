import { ISale } from "../ISale";
import { IDynamoDbItem } from "./IDynamoDbItem";

export interface ISaleDDB extends IDynamoDbItem {
  sale: ISale;
}
