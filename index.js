import express from "express";
import bodyParser from "body-parser";

import todoRoutes from "./routes/todos.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
