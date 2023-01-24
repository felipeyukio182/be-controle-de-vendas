import { IUser } from "../../../models/IUser";

export interface IResLogin {
  user: IUser;
  token: string;
  refreshToken: string;
}
