import { sign, verify } from "jsonwebtoken";
import { auth } from "./config/auth";

const generateJwtToken = ({ email, password }: any): string => {
  const jwtToken = sign({ email, password }, auth.jwt.secret, {
    expiresIn: auth.jwt.expiresIn,
  });
  return jwtToken;
};

const verifyJwtToken = (jwtToken: string) => {
  const decodedJwtToken = verify(jwtToken, auth.jwt.secret);
  return decodedJwtToken;
};

const generateJwtRefreshToken = ({ email, password }: any): string => {
  const jwtRefreshToken = sign({ email, password }, auth.jwtRefresh.secret, {
    expiresIn: auth.jwtRefresh.expiresIn,
  });
  return jwtRefreshToken;
};

const verifyJwtRefreshToken = (jwtToken: string) => {
  const decodedJwtToken = verify(jwtToken, auth.jwt.secret);
  return decodedJwtToken;
};

export {
  generateJwtToken,
  verifyJwtToken,
  generateJwtRefreshToken,
  verifyJwtRefreshToken,
};
