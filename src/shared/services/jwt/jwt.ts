import { sign, verify } from "jsonwebtoken";
import { ITokenPayload } from "../../../models/ITokenPayload";
import { IUser } from "../../../models/IUser";
import { auth } from "./config/auth";

const generateJwtToken = ({ id, email, username }: IUser): string => {
  const jwtToken = sign({ id, email, username }, auth.jwt.secret, {
    expiresIn: auth.jwt.expiresIn,
    subject: `${id}`,
  });
  return jwtToken;
};

const verifyJwtToken = (
  jwtToken: string,
  ignoreExpiration = false
): ITokenPayload => {
  try {
    const decodedJwtToken = verify(jwtToken, auth.jwt.secret, {
      ignoreExpiration: ignoreExpiration,
    }) as ITokenPayload;
    return decodedJwtToken;
  } catch (error) {
    throw new Error("Token inválido.");
  }
};

const generateJwtRefreshToken = ({ id, email, username }: IUser): string => {
  const jwtRefreshToken = sign(
    { id, email, username },
    auth.jwtRefresh.secret,
    {
      expiresIn: auth.jwtRefresh.expiresIn,
      subject: `${id}`,
    }
  );
  return jwtRefreshToken;
};

const verifyJwtRefreshToken = (
  jwtToken: string,
  ignoreExpiration = false
): ITokenPayload => {
  try {
    const decodedJwtToken = verify(jwtToken, auth.jwtRefresh.secret, {
      ignoreExpiration: ignoreExpiration,
    }) as ITokenPayload;
    return decodedJwtToken;
  } catch (error) {
    throw new Error("Refresh token inválido.");
  }
};

export {
  generateJwtToken,
  verifyJwtToken,
  generateJwtRefreshToken,
  verifyJwtRefreshToken,
};
