import { promises as fs } from "fs";
import { Todo } from "../types/todos";
import path from "path";

const filePath = path.join(__dirname, "../todos.json");

const readTodos = async (): Promise<Todo[]> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTodos = async (todos: Todo[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
};

export { readTodos, writeTodos };
