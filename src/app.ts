import express, { NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response } from "express";
import { CustomError } from "./types/error";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: CustomError = new Error(
    `Route ${req.method} ${req.url} not found`,
  );
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

export default app;
