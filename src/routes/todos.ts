import express from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos";
import { validateRequestBody } from "../middleware/validate";
import { createTodoSchema, updateTodoSchema } from "../validators/todo";

const router = express.Router();

// All routes in this file will be prefixed with /todos
router.get("/", getTodos);

router.post("/", validateRequestBody(createTodoSchema), createTodo);

router.get("/:id", getTodoById);

router.delete("/:id", deleteTodo);

router.patch("/:id", validateRequestBody(updateTodoSchema), updateTodo);

export default router;
