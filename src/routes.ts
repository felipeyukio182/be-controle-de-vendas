import { Application } from "express";
import ping from "./modules/ping/route";
import auth from "./modules/auth/route";
import people from "./modules/people/route";
import products from "./modules/products/route";

const createRoutes = (app: Application) => {
  app.use("/", ping);
  app.use("/auth", auth);
  app.use("/people", people);
  app.use("/products", products);
};

export default createRoutes;
