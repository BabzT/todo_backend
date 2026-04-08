import { ObjectId } from "mongodb";
import { ParamsDictionary } from "express-serve-static-core";

export interface todoParams extends ParamsDictionary {
  id: string;
}

export interface Todo {
  _id?: ObjectId;
  title: string;
  isCompleted: boolean;
}
