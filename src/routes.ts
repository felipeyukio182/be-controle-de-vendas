import { Application } from "express";
import ping from "./modules/ping/route";
import auth from "./modules/auth/route";

const createRoutes = (app: Application) => {
  app.use("/", ping);
  app.use("/auth", auth);
};

export default createRoutes;
