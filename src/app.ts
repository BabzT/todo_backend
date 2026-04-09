import express, { NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

app.use((req: Request, res: Response) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});

export default app;
