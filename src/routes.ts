import { Application } from "express";
import login from "./modules/login/route";
import route1 from "./route1";

const createRoutes = (app: Application) => {
  app.use("/", login);
  app.use("/", route1);
};

export default createRoutes;
