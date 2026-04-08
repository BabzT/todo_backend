import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface ValidateSchemas {
  params?: any;
  body?: any;
  query?: any;
}

const validateRequest = (schemas: ValidateSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const [source, schema] of Object.entries(schemas)) {
        const data = schema.parse(req[source as keyof Request]);
        (req as any)[source] = data;
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((e) => e.message).join(", ");
        return res.status(400).send({ message: message || "Validation error" });
      }
      next(err);
    }
  };
};

export default validateRequest;
