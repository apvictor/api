import { NotFoundError } from "../../configs/errors/ApiError";
import { PrismaService } from "../../shared/services/PrismaService";
import { CreateAccountModel, UpdateAccountModel } from './../models/AccountModel';

export const AccountRepository = {
  async insert(account: CreateAccountModel) {
    const data = await PrismaService.accounts.create({
      data: {
        name: account.name,
        userId: account.userId
      }
    });

    return data;
  },
  async update(id: number, account: UpdateAccountModel) {
    const data = await PrismaService.accounts.update({
      where: { id },
      data: {
        name: account.name
      }
    });

    return data;
  },
  async delete(id: number) {
    const account = await this.getById(id);

    const data = await PrismaService.accounts.delete({
      where: { id: account.id }
    });

    return data;
  },
  async getById(id: number) {
    const data = await PrismaService.accounts.findUnique({
      where: { id },
    });

    if (!data) throw new NotFoundError();

    return data;
  },
  async getAll(userId: number) {
    const data = await PrismaService.accounts.findMany({
      where: { userId, },
    });

    if (!data) throw new NotFoundError();

    return data;
  }
}
