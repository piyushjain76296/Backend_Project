import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateResource = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: e.errors.map(err => ({ field: err.path.join('.'), message: err.message }))
        });
        return;
      }
      next(e);
    }
};
