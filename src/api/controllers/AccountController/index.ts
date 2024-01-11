import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateAccountModel } from "../../models/AccountModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const AccountController = {
  create: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth
    const accountData: CreateAccountModel = request.body;

    const data = await AccountRepository.insert({ ...accountData, userId: user.id });

    return response.json(data);
  }),
  getTotal: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth

    const total = await AccountRepository.getTotalMonth(user.id);

    return response.json({ total });
  }),
  getAccounts: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth

    const data = await AccountRepository.getAll(user.id);

    return response.json(data);
  }),
}
