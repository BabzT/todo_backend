import { z } from "zod";
import { ObjectId } from "mongodb";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const todoIdSchema = z
  .string()
  .min(1, "ID is required")
  .refine((id) => ObjectId.isValid(id), {
    message: "Invalid ID format",
  });

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  isCompleted: z
    .boolean({ message: "Status must be either true or false" })
    .optional(),
});
