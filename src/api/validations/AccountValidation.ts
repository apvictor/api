import { number, object, string } from 'yup';

export const AccountValidation = {
  create: object({
    body: object({
      name: string().required(),
    }),
  }),
  edit: object({
    params: object({
      id: string().required(),
    }),
    body: object({
      name: string().required(),
    }),
  }),
  delete: object({
    params: object({
      id: string().required(),
    }),
  }),
}
