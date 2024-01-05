import { NextFunction, Request, Response } from "express";

export const Validate = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    });
    return next();
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
