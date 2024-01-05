import { ERROR_401_MESSAGE, ERROR_404_MESSAGE } from "../constants";

export class ApiError extends Error {
  field?: string;
  status: number;

  constructor(status: number, message: string, field?: any) {
    super(message);
    this.status = status;
    this.field = field;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor() {
    super(404, ERROR_404_MESSAGE);
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, ERROR_401_MESSAGE);
  }
}

export class ZodError extends ApiError {
  constructor(message: any) {
    super(400, message.errors[0].message, message.errors[0].path[0]);
  }
}
