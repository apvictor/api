import { TransactionTypeEnum } from '@prisma/client';
import { PrismaService } from '../../shared/services/PrismaService';
import { CreateTransactionModel, UpdateTransactionModel } from './../models/TransactionModel';
import { NotFoundError } from '../../configs/errors/ApiError';

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
  async getAll(userId: number, search?: string, transactionType?: TransactionTypeEnum) {
    const data = await PrismaService.transactions.findMany({
      include: {
        account: true,
        costCenter: true
      },
      orderBy: { createdAt: "desc" },
      where: {
        account: { userId },
        name: { contains: search },
        transactionType
      },
    });

    return data;
  },
  async getTotal(userId: number, transactionType: "EXPENSE" | "INCOME") {
    const date = new Date();
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
  },
  async getTotalByAccountId(accountId: number, transactionType: "EXPENSE" | "INCOME") {
    const date = new Date();
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
  },


}
