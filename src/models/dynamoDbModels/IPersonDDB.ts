import { IPerson } from "../IPerson";
import { IDynamoDbItem } from "./IDynamoDbItem";

export interface IPersonDDB extends IDynamoDbItem {
  person: IPerson;
}
