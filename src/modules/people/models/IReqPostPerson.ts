import { INewPerson } from "../../../models/IPerson";

export interface IReqPostPerson {
  username: string;
  person: INewPerson;
}
