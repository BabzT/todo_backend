import { Request, Response } from "express";
import { readTodos, writeTodos } from "../services/todos";
import { Todo, todoParams } from "../types/todos";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await readTodos();
  res.send({ message: "Todos retrieved successfully", todos });
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const todos = await readTodos();
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    isCompleted: false,
  };
  todos.push(newTodo);
  await writeTodos(todos);
  res.status(201).send({ message: "Todo created successfully", todo: newTodo });
};

export const getTodoById = async (req: Request<todoParams>, res: Response) => {
  const { id } = req.params;
  const todos = await readTodos();
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  res.send({ message: "Todo retrieved successfully", todo });
};

export const updateTodo = async (req: Request<todoParams>, res: Response) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  const todos = await readTodos();
  const todo = todos.find((t) => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  todo.title = title;
  todo.isCompleted = isCompleted;
  await writeTodos(todos);
  res.send({ message: "Todo updated successfully", todo });
};

export const deleteTodo = async (req: Request<todoParams>, res: Response) => {
  const { id } = req.params;
  const todos = await readTodos();
  const index = todos.findIndex((t) => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send({ message: "Todo not found" });
  }
  todos.splice(index, 1);
  await writeTodos(todos);
  res.send({ message: "Todo deleted successfully" });
};
