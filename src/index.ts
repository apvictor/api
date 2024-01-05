import "dotenv/config";
import cors from "cors";
import express from "express";
import { ErrorHandler } from "./configs/errors/ErrorHandler";

import { api } from "./routes/api";

const app = express();

const port = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", (req, res) => {
  res.json("Express on Vercel");
});

app.use(api);

app.use("*", ErrorHandler.generics());

app.use(ErrorHandler.handle());

app.listen(port, () => {
  console.log(`Running on port http://localhost:${port}`);
});
