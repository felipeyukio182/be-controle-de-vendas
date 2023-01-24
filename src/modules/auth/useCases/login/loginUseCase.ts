import {
  generateJwtRefreshToken,
  generateJwtToken,
} from "../../../../shared/modules/jwt/jwt";
import { IReqLogin } from "../../models/IReqLogin";
import { IResLogin } from "../../models/IResLogin";
import { findUserDb } from "../../repositories/authRepository";

const findUser = async ({
  email,
  password,
}: IReqLogin): Promise<IResLogin | null> => {
  const user = await findUserDb({ email, password });
  if (!user) {
    return null;
  }
  const token = generateJwtToken(user);
  const refreshToken = generateJwtRefreshToken(user);
  return { user, token, refreshToken };
};

export { findUser };
