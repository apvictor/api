import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt"
import { Request, Response } from "express"
import { UserDTO } from "../../models/UserModel";
import { ApiError } from "../../../configs/errors/ApiError";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { ERROR_USER_EMAIL_PASS } from "../../../configs/constants";

export const login = MapErrors(async (request: Request, response: Response) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Fazer login'

  const { email, password } = request.body;

  const userExist = await UserRepository.getByEmail(email);
  if (!userExist) throw new ApiError(400, ERROR_USER_EMAIL_PASS);

  const match = compareSync(password, userExist.password);
  if (!match) throw new ApiError(400, ERROR_USER_EMAIL_PASS);

  const token = jwt.sign({ userId: userExist.id }, `${process.env.JWT_SECRET}`, { expiresIn: "8h" });

  const data: UserDTO = userExist;

  return response.json({ token, data });
});
