import { NextFunction, Request, Response } from "express";
import * as todoService from "../services/todos";
import { Todo } from "../types/todos";
import { CustomError } from "../types/error";

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search } = req.query;
    const todos = await todoService.getTodos(search as string | undefined);
    res.send({ message: "Todos retrieved successfully!", todos });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;
    const newTodo: Todo = {
      title,
      isCompleted: false,
    };

    const createdTodo = await todoService.createTodo(newTodo);
    res
      .status(201)
      .send({ message: "Todo created successfully", todo: createdTodo });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const todo = await todoService.findTodoById(id);
    if (!todo) {
      const error: CustomError = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }
    res.send({
      message: "Todo retrieved successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const todo = await todoService.updateTodo(id, req.body);
    if (!todo) {
      const error: CustomError = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }

    res.send({ message: "Todo updated successfully", todo });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const deleted = await todoService.deleteTodo(id);
    if (!deleted) {
      const error: CustomError = new Error("Todo not found");
      error.statusCode = 404;
      return next(error);
    }
    res.send({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
