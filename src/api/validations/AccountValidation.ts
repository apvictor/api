import { object, string } from 'yup';

const AccountTypeEnum = {
  CASH: "CASH",
  INVESTMENT: "INVESTMENT"
}
export const AccountValidation = {
  create: object({
    body: object({
      name: string().required(),
      type: string().oneOf(Object.values(AccountTypeEnum)).required()
    }),
  }),
}
