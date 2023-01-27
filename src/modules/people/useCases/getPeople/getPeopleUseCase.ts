import { IPerson } from "../../../../models/IPerson";
import { getPeopleDb } from "../../repositories/peopleRepository";

export const getPeople = async (username: string): Promise<IPerson[]> => {
  const people = await getPeopleDb(username);
  return people;
};
