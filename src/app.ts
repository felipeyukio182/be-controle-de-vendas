import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import createRoutes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

createRoutes(app);

app.listen(port, () => {
  console.log("--- Backend Controle de Vendas ---");
  console.log(`Env: ${process.env.ENVIRONMENT}`);
  console.log(`PORT: ${port}`);
});
