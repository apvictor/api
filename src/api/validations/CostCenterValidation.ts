import { object, string, number } from 'yup';

export const CostCenterValidation = {
  create: object({
    body: object({
      name: string().required(),
      percentage: number().min(1).max(100),
    }),
  }),
}
