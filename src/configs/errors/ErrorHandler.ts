import { Request, Response, NextFunction } from "express";
import { ApiError, NotFoundError } from "./ApiError";
import { ERROR_500_MESSAGE } from "../constants";
import { Prisma } from "@prisma/client";

export class ErrorHandler {
  static handle = () => {
    return (error: ApiError, request: Request, response: Response, next: NextFunction) => {
      const status = error.status || 500;

      if (process.env.SERVER_ENV == "prod" &&
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientValidationError
      ) {
        return response.status(500).json({ error: ERROR_500_MESSAGE });
      }

      if (error.field) return response.status(status).json({ field: error.field, error: error.message });

      return response.status(status).json({ error: error.message });
    };
  };

  static generics = () => {
    return (request: Request, response: Response, next: NextFunction) => {
      next(new NotFoundError())
    };
  };
}
