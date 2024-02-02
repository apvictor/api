import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { ErrorHandler } from "./configs/errors/ErrorHandler";

import { serve, setup } from "swagger-ui-express";
import swaggerFile from "./configs/swagger/swagger_output.json";

import { api } from "./routes/api";

const app = express();

export const port = process.env.SERVER_PORT || 3000
export const url = process.env.SERVER_URL || "http://localhost"

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (request: Request, response: Response) => {
  return response.redirect("/swagger");
});

app.use("/swagger", serve, setup(swaggerFile));

app.use(api);

app.use("*", ErrorHandler.generics());

app.use(ErrorHandler.handle());

app.listen(port, () => {
  console.log(`🚀 Servidor executando ${url}:${port}`);
});
