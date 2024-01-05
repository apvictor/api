import { PrismaService } from "../services/PrismaService"
import { CreateTransactionModel } from './../models/TransactionModel';

export const TransactionRepository = {
  async insert(transaction: CreateTransactionModel) {
    const data = await PrismaService.transactions.create({ data: transaction });

    return data;
  },
  async getAll(userId: number, search?: string) {
    const data = await PrismaService.transactions.findMany({
      include: {
        account: true,
        costCenter: true
      },
      orderBy: { createdAt: "desc" },
      where: {
        account: { userId },
        name: { contains: search },
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

}
