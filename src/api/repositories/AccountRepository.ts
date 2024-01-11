import { NotFoundError } from "../../configs/errors/ApiError";
import { PrismaService } from "../../shared/services/PrismaService";
import { AccountModel, CreateAccountModel, UpdateAccountModel } from './../models/AccountModel';
import { TransactionRepository } from "./TransactionRepository";

export const AccountRepository = {
  async insert(account: CreateAccountModel) {
    const data = await PrismaService.accounts.create({ data: account });

    return data;
  },
  async update(id: number, account: UpdateAccountModel) {
    const data = await PrismaService.accounts.update({
      data: account,
      where: { id }
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
      where: { userId },
    });

    if (!data) throw new NotFoundError();

    return data;
  },
  async getTotalMonth(userId: number) {
    const date = new Date();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const { _sum: { value } } = await PrismaService.accounts.aggregate({
      where: {
        userId,
        createdAt: {
          gte: startMonth,
          lte: endMonth,
        }
      },
      _sum: { value: true }
    });

    return value ?? 0;
  },
}
