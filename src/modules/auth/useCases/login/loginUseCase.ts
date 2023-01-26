import {
  generateJwtRefreshToken,
  generateJwtToken,
} from "../../../../shared/services/jwt/jwt";
import { IReqLogin } from "../../models/IReqLogin";
import { IResLogin } from "../../models/IResLogin";
import { findUserDb } from "../../repositories/authRepository";

const findUser = async ({
  username,
  password,
}: IReqLogin): Promise<IResLogin | null> => {
  const user = await findUserDb({ username, password });
  if (!user) {
    return null;
  }
  const token = generateJwtToken(user);
  const refreshToken = generateJwtRefreshToken(user);
  return { user, token, refreshToken };
};

export { findUser };
