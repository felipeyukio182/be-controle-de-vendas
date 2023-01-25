import { IUser } from "../../../../models/IUser";
import {
  generateJwtRefreshToken,
  generateJwtToken,
  verifyJwtRefreshToken,
  verifyJwtToken,
} from "../../../../shared/services/jwt/jwt";
import { ITokens } from "../../models/ITokens";

const getNewTokens = ({ token, refreshToken }: ITokens): ITokens => {
  const tokenPayload = verifyJwtToken(token, true);
  const refreshTokenPayload = verifyJwtRefreshToken(refreshToken);

  if (!tokenHasExpired(tokenPayload.exp)) {
    throw new Error("Token não expirado.");
  }

  if (tokenPayload.sub !== refreshTokenPayload.sub) {
    throw new Error("Tokens inválidos.");
  }

  const user: IUser = {
    id: tokenPayload.id,
    email: tokenPayload.email,
    username: tokenPayload.username,
  };

  const newToken = generateJwtToken(user);
  const newRefreshToken = generateJwtRefreshToken(user);

  return { token: newToken, refreshToken: newRefreshToken };
};

const tokenHasExpired = (exp = 0): boolean => {
  const expMs = exp * 1000;
  const currentTimeMs = new Date().getTime();
  return expMs < currentTimeMs;
};

export { getNewTokens };
