import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import createRoutes from "./routes";
import bodyParser from "body-parser";
import pino from "pino-http";

const app = express();
const port = process.env.PORT || 3000;

const httpLogger = pino();

app.use(bodyParser.json());
app.use(httpLogger);

createRoutes(app);

app.listen(port, () => {
  console.log("--- Backend Controle de Vendas ---");
  console.log(`Env: ${process.env.ENVIRONMENT}`);
  console.log(`URL: ${process.env.BASE_URL}`);
  console.log(`PORT: ${port}`);
});
