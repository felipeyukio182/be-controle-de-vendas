import { IReqPostPerson } from "../../models/IReqPostPerson";
import { postPersonDb } from "../../repositories/peopleRepository";

export const postPerson = async ({
  username,
  person,
}: IReqPostPerson): Promise<number | null> => {
  const httpStatus = await postPersonDb({ username, person });
  return httpStatus;
};
