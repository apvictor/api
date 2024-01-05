import { UserDTO } from "../models/UserModel"
import { CreateUserModel } from './../models/UserModel';
import { PrismaService } from "../services/PrismaService"
import { ERROR_USER_EXIST_MESSAGE } from "../../configs/constants";
import { ApiError, NotFoundError } from "../../configs/errors/ApiError";

export const UserRepository = {
  async insert(user: CreateUserModel) {
    const userExist = await this.getByEmail(user.email)

    if (userExist) throw new ApiError(400, ERROR_USER_EXIST_MESSAGE)

    const { password, ...rest } = await PrismaService.users.create({ data: user });

    return rest;
  },
  async getByEmail(email: string) {
    const data = await PrismaService.users.findUnique({ where: { email } });

    return data;
  },
  async getAll() {
    const data: UserDTO[] = await PrismaService.users.findMany();

    return data;
  },
  async getById(id: number) {
    const data: UserDTO | null = await PrismaService.users.findUnique({ where: { id } });

    if (!data) throw new NotFoundError();

    return data;
  }
}
