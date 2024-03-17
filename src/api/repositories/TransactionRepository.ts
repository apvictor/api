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
  async getAll(userId: number, month?: string, search?: string, transactionType?: TransactionTypeEnum) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const data = await PrismaService.transactions.findMany({
        include: {
          account: true,
          costCenter: true
        },
        orderBy: { createdAt: "desc" },
        where: {
          account: { userId },
          name: { contains: search },
          transactionType,
          createdAt: {
            gte: startMonth,
            lte: endMonth,
          }
        },
      });

      return data;
    }
  },
  async getTotal(userId: number, transactionType: "EXPENSE" | "INCOME", month?: string) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { _sum: { value } } = await PrismaService.transactions.aggregate({
        _sum: { value: true },
        where: {
          account: { userId },
          transactionType,
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
        transactionType,
      },
    });

    return value ?? 0;
  },
  async getTotalByAccountId(accountId: number, transactionType: "EXPENSE" | "INCOME", month?: string) {
    if (month) {
      let [ano, mes] = month?.split("-");

      const date = new Date(Number(ano), Number(mes) - 1);
      const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { _sum: { value } } = await PrismaService.transactions.aggregate({
        _sum: { value: true },
        where: {
          accountId,
          transactionType,
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
        transactionType,
      },
    });

    return value ?? 0;
  },


}
