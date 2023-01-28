import { IPerson } from "../../../models/IPerson";

export interface IReqPutPerson {
  username: string;
  person: IPerson;
  personId: number;
}
