import { PrismaService } from "../services/PrismaService";
import { NotFoundError } from "../../configs/errors/ApiError";
import { CostCenterModel, CreateCostCenterModel } from './../models/CostCenterModel';

export const CostCenterRepository = {
  async insert(costCenter: CreateCostCenterModel) {
    const data = await PrismaService.costCenters.create({ data: costCenter });

    return data;
  },
  async getTotalPercentage(userId: number) {
    const { _sum: { percentage } } = await PrismaService.costCenters.aggregate({
      _sum: { percentage: true },
      where: { userId }
    });

    return percentage ?? 0;
  },
  async getAll(userId: number, transactionType?: "EXPENSE" | "INCOME") {
    const data: CostCenterModel[] = await PrismaService.costCenters.findMany({
      include: {
        transactions: { where: { transactionType } }
      },
      where: { userId },
    });

    return data;
  },
  async getById(id: number) {
    const data = await PrismaService.costCenters.findUnique({
      where: { id },
    });

    if (!data) throw new NotFoundError();

    return data;
  },

}
