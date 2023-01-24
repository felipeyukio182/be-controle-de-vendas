export const auth = {
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "2H",
  },
  jwtRefresh: {
    secret: process.env.JWT_REFRESH_SECRET ?? "",
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "24H",
  },
};
