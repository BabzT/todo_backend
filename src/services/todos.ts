import fs from "fs";
import { Todo } from "../types/todos";
import path from "path";

const filePath = path.join(__dirname, "../todos.csv");

const createFileIfNotExists = async () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const readTodos = async (): Promise<Todo[]> => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8").trim();
  if (!data) return [];

  const rows = data.split("\n");
  const headers = rows[0].split(",");
  return rows.slice(1).map((row) => {
    const values = row.split(",");
    const todo: any = {};

    headers.forEach((header, index) => {
      todo[header] = values[index];
    });
    return todo as Todo;
  });
};

const writeTodos = async (todos: Todo[]): Promise<void> => {
  createFileIfNotExists();
  const headers = Object.keys(todos[0] || {}).join(",");
  const rows = todos.map((todo) => Object.values(todo).join(",")).join("\n");
  const csvData = `${headers}\n${rows}`;
  fs.writeFileSync(filePath, csvData, "utf-8");
};

export { readTodos, writeTodos };
