import "dotenv/config";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import express, { Request, Response } from "express";
import { ErrorHandler } from "./configs/errors/ErrorHandler";
import swaggerFile from "./configs/swagger/swagger_output.json";

import { api } from "./routes/api";

const app = express();

const port = process.env.SERVER_PORT || 3000

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
  console.log(`Running on port http://localhost:${port}`);
});
