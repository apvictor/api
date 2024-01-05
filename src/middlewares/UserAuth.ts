import jwt from 'jsonwebtoken';
import { NextFunction, Response } from "express";
import { ApiError } from '../configs/errors/ApiError';
import { MapErrors } from '../configs/errors/MapErrors';
import { UserRepository } from '../api/repositories/UserRepository';
import { UserAuthRequest } from '../configs/requests/UserAuthRequest';
import { ERROR_TOKEN_NOT_PROVIDED_MESSAGE } from '../configs/constants';

export const UserAuth = MapErrors(async (request: UserAuthRequest, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) throw new ApiError(400, ERROR_TOKEN_NOT_PROVIDED_MESSAGE)

  const token = authorization.replace("Bearer ", "");

  const decoded: any | { userId: number } = jwt.verify(token, `${process.env.JWT_SECRET}`);

  const user = await UserRepository.getById(decoded.userId);

  request.userAuth = user;
  next();
});
