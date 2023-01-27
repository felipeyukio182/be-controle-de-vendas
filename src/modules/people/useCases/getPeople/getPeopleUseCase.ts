import { getPeopleDb } from "../../repositories/peopleRepository";

export const getPeople = async (username: string) => {
  const people = await getPeopleDb(username);
  return people;
};
