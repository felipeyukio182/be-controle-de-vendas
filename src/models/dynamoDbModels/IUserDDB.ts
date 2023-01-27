import { IUser } from "../IUser";
import { IDynamoDbItem } from "./IDynamoDbItem";

export interface IUserDDB extends IDynamoDbItem {
  user: IUser;
}
