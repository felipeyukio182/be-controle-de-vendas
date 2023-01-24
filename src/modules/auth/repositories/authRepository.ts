import { IUser } from "../../../models/IUser";
import { IReqLogin } from "../models/IReqLogin";

const findUserDb = ({ email, password }: IReqLogin): IUser => {
  return { email, password };
};

export { findUserDb };
