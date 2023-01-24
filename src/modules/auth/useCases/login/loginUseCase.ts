import {
  generateJwtRefreshToken,
  generateJwtToken,
} from "../../../../shared/modules/jwt/jwt";
import { IReqLogin } from "../../models/IReqLogin";
import { findUserDb } from "../../repositories/authRepository";

const findUser = ({ email, password }: IReqLogin): any => {
  const user = findUserDb({ email, password });
  const token = generateJwtToken({ email, password });
  const refreshToken = generateJwtRefreshToken({ email, password });
  return { user, token, refreshToken };
};

export { findUser };
