import { Request, Response } from "express";
import * as todoService from "../services/todos";
import { Todo } from "../types/todos";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const todos = await todoService.getTodos(search as string | undefined);
    res.send({ message: "Todos retrieved successfully!", todos });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
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
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const todo = await todoService.findTodoById(id);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.send({
      message: "Todo retrieved successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const isTodoExist = await todoService.findTodoById(id);
    if (!isTodoExist) {
      return res.status(404).send({ message: "Todo not found" });
    }
    const todo = await todoService.updateTodo(id, req.body);
    res.send({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const isTodoExist = await todoService.findTodoById(id);
    if (!isTodoExist) {
      return res.status(404).send({ message: "Todo not found" });
    }
    await todoService.deleteTodo(id);

    res.send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
