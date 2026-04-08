import { Request, Response } from "express";
import * as todoService from "../services/todos";
import { Todo } from "../types/todos";

export const getTodos = async (req: Request, res: Response) => {
  const { search } = req.query;
  // This is to search by title
  const todos = await todoService.getTodos(search as string | undefined);
  res.send({ message: "Todos retrieved successfully!", todos });
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo: Todo = {
    title,
    isCompleted: false,
  };

  const createdTodo = await todoService.createTodo(newTodo);
  res
    .status(201)
    .send({ message: "Todo created successfully", todo: createdTodo });
};

export const getTodoById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const todo = await todoService.findTodoById(id);
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }
  res.send({
    message: "Todo retrieved successfully",
    todo,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const todo = await todoService.updateTodo(id, req.body);
  if (!todo) {
    return res.status(404).send({ message: "Todo not found" });
  }

  res.send({ message: "Todo updated successfully", todo });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const deleted = await todoService.deleteTodo(id);
  if (!deleted) {
    return res.status(404).send({ message: "Todo not found" });
  }
  res.send({ message: "Todo deleted successfully" });
};
