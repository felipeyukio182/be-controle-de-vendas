import { IReqLogin } from "../models/IReqLogin";

const findUserDb = ({ email, password }: IReqLogin): any => {
  return { email, password };
};

export { findUserDb };
