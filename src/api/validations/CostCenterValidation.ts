import { object, string, number } from 'yup';

export const CostCenterValidation = {
  create: object({
    body: object({
      name: string().required(),
      percentage: number().min(1).max(100),
    }),
  }),
  edit: object({
    params: object({
      id: string().required(),
    }),
    body: object({
      name: string().required(),
      percentage: number().min(1).max(100),
    }),
  }),
  delete: object({
    params: object({
      id: string().required(),
    }),
  }),
}
