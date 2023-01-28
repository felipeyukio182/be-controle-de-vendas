import { IReqPutPerson } from "../../models/IReqPutPerson";
import { putPersonDb } from "../../repositories/peopleRepository";

export const putPerson = async ({
  username,
  person,
  personId,
}: IReqPutPerson): Promise<number | null> => {
  const httpStatus = await putPersonDb({ username, person, personId });
  return httpStatus;
};
