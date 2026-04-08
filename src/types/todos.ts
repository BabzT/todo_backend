import { ObjectId } from "mongodb";

export interface Todo {
  _id?: ObjectId;
  title: string;
  isCompleted: boolean;
}
