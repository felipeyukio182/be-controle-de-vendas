import { IReqDeletePerson } from "../../models/IReqDeletePerson";
import { deletePersonDb } from "../../repositories/peopleRepository";

export const deletePerson = async ({
  username,
  personId,
}: IReqDeletePerson): Promise<number | null> => {
  const httpStatus = await deletePersonDb({ username, personId });
  return httpStatus;
};
