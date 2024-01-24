import { hashSync } from "bcrypt"
import { Request, Response } from "express"
import { CreateUserModel } from "../../models/UserModel";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";

export const register = MapErrors(async (request: Request, response: Response) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Fazer cadastro'

  const userData: CreateUserModel = request.body;

  const passwordHash = await hashSync(userData.password, 10);

  const data = await UserRepository.insert({ ...userData, password: passwordHash });

  return response.json(data);
});
