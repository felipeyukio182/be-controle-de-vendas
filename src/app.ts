import express from "express";
import createRoutes from "./routes";
const app = express();
const port = 3000;

createRoutes(app);

app.listen(port, () => {
  console.log("--- Backend Controle de Vendas ---\n");
  console.log(`Executando na porta ${port}...`);
});
