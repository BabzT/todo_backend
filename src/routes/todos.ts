import express from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos";

const router = express.Router();

// All routes in this file will be prefixed with /todos
router.get("/", getTodos);

router.post("/", createTodo);

router.get("/:id", getTodoById);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

export default router;
