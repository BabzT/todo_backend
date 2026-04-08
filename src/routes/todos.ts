import express from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../controllers/todos";
import validateRequest from "../middleware/validate";
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema,
} from "../validators/todo";

const router = express.Router();

// All routes in this file will be prefixed with /todos
router.get("/", getTodos);

router.post("/", validateRequest({ body: createTodoSchema }), createTodo);

router.get("/:id", validateRequest({ params: todoIdSchema }), getTodoById);

router.delete("/:id", validateRequest({ params: todoIdSchema }), deleteTodo);

router.patch(
  "/:id",
  validateRequest({ params: todoIdSchema, body: updateTodoSchema }),
  updateTodo,
);

export default router;
