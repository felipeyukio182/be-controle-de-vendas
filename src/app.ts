import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import createRoutes from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

createRoutes(app);

app.listen(port, () => {
  console.log("--- Backend Controle de Vendas ---\n");
  console.log(
    `Executando no ambiente ${process.env.ENVIRONMENT}, na porta ${port}...`
  );
});
