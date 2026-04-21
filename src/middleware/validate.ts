import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export const validateRequestBody = (bodySchema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      bodySchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message: string = err.issues.map((e) => e.message).join(", ");
        return res.status(400).send({ message: message || "Validation error" });
      }
      next(err);
    }
  };
};
