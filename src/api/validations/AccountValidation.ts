import { number, object, string } from 'yup';

export const AccountValidation = {
  create: object({
    body: object({
      name: string().required(),
      value: number().required(),
    }),
  }),
}
