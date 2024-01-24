import { hashSync } from "bcrypt"
import { Request, Response } from "express"
import { CreateUserModel } from "../../models/UserModel";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";

export const register = MapErrors(async (request: Request, response: Response) => {
  /*
    #swagger.tags = ['Autenticação']
    #swagger.summary = 'Fazer cadastro'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: "Armando Pereira",
        email: "a@gmail.com",
        password: "12345678",
      }
    }
  */

  const userData: CreateUserModel = request.body;

  const passwordHash = await hashSync(userData.password, 10);

  const data = await UserRepository.insert({ ...userData, password: passwordHash });

  return response.json(data);
});
