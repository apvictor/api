import { Response } from "express"
import { UserDTO } from "../../models/UserModel";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const UserController = {
  me: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth;

    const data = await UserRepository.getById(user.id);

    return response.json(data);
  }),
  getUsers: MapErrors(async (request: Request, response: Response) => {
    const data = await UserRepository.getAll();

    return response.json(data);
  }),
}
