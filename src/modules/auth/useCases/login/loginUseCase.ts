import {
  generateJwtRefreshToken,
  generateJwtToken,
} from "../../../../shared/modules/jwt/jwt";
import { IReqLogin } from "../../models/IReqLogin";
import { IResLogin } from "../../models/IResLogin";
import { findUserDb } from "../../repositories/authRepository";

const findUser = ({ email, password }: IReqLogin): IResLogin => {
  const user = findUserDb({ email, password });
  const token = generateJwtToken({ email, password });
  const refreshToken = generateJwtRefreshToken({ email, password });
  return { user, token, refreshToken };
};

export { findUser };
