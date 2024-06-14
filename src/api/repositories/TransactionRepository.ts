import { TransactionTypeEnum } from '@prisma/client';
import { NotFoundError } from '../../configs/errors/ApiError';
import { PrismaService } from '../../shared/services/PrismaService';
import { CreateTransactionModel, UpdateTransactionModel } from './../models/TransactionModel';

export const TransactionRepository = {
  async delete(id: number) {
    const transaction = await this.getById(id);
    const data = await PrismaService.transactions.delete({ where: { id } });

    return data;
  },
  async update(id: number, transaction: UpdateTransactionModel) {
    const data = await PrismaService.transactions.update({ data: transaction, where: { id } });

    return data;
  },
  async insert(transaction: CreateTransactionModel) {
    const data = await PrismaService.transactions.create({ data: transaction });

    return data;
  },
  async getById(id: number) {
    const data = await PrismaService.transactions.findUnique({
      where: { id },
    });

    if (!data) throw new NotFoundError();

    return data;
  },
  async getAll(userId: number, month?: string, search?: string, type?: TransactionTypeEnum) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const data = await PrismaService.transactions.findMany({
        include: {
          account: true,
        },
        orderBy: { createdAt: "desc" },
        where: {
          account: { userId },
          name: { contains: search },
          type,
          createdAt: {
            gte: startMonth,
            lte: endMonth,
          }
        },
      });

      return data;
    }
  },
  async getTotal(userId: number, type: "EXPENSE" | "INCOME", month?: string) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { _sum: { value } } = await PrismaService.transactions.aggregate({
        _sum: { value: true },
        where: {
          account: { userId },
          type,
          createdAt: {
            gte: startMonth,
            lte: endMonth,
          }
        },
      });

      return value ?? 0;
    }
    const { _sum: { value } } = await PrismaService.transactions.aggregate({
      _sum: { value: true },
      where: {
        account: { userId },
        type,
      },
    });

    return value ?? 0;
  },
  async getTotalByAccountId(accountId: number, type: "EXPENSE" | "INCOME", month?: string) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { _sum: { value } } = await PrismaService.transactions.aggregate({
        _sum: { value: true },
        where: {
          accountId,
          type,
          createdAt: {
            gte: startMonth,
            lte: endMonth,
          }
        },
      });

      return value ?? 0;
    }

    const { _sum: { value } } = await PrismaService.transactions.aggregate({
      _sum: { value: true },
      where: {
        accountId,
        type,
      },
    });

    return value ?? 0;
  },


}
