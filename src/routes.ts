import { Application } from "express";
import auth from "./modules/auth/route";
import route1 from "./route1";

const createRoutes = (app: Application) => {
  app.use("/auth", auth);
  app.use("/", route1);
};

export default createRoutes;
