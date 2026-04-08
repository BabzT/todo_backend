import { getDb } from "../config/db";
import { Todo } from "../types/todos";
import { Collection, ObjectId } from "mongodb";

const dbCollection = (): Collection<Todo> => getDb().collection("todos");

const getTodos = async (search?: string): Promise<Todo[]> => {
  const filter = search ? { title: { $regex: search, $options: "i" } } : {};
  const todos = await dbCollection().find(filter).toArray();
  return todos;
};

const createTodo = async (todo: Todo): Promise<Todo> => {
  await dbCollection().insertOne(todo);
  return todo;
};

const findTodoById = async (id: string): Promise<Todo | null> => {
  const todo = await dbCollection().findOne({ _id: new ObjectId(id) });
  return todo;
};

const updateTodo = async (
  id: string,
  todo: Partial<Todo>,
): Promise<Todo | null> => {
  const updatedTodo = await dbCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: todo },
    { returnDocument: "after" },
  );
  return updatedTodo;
};

const deleteTodo = async (id: string): Promise<boolean> => {
  const result = await dbCollection().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

export { getTodos, createTodo, findTodoById, updateTodo, deleteTodo };
