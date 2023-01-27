import { IPerson } from "../../../../models/IPerson";
import { IReqGetPerson } from "../../models/IReqGetPerson";
import { getPersonDb } from "../../repositories/peopleRepository";

export const getPerson = async ({
  username,
  personId,
}: IReqGetPerson): Promise<IPerson | null> => {
  const person = await getPersonDb({ username, personId });
  return person;
};
