import express from "express";
import { connectToDatabase } from "./config/db";
import todoRoutes from "./routes/todos";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
