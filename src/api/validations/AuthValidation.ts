import {object, string} from 'yup';

export const AuthValidation = {
  register: object({
    body: object({
      name: string().required(),
      email: string().email().required(),
      password: string().min(8).required()
    }),
  }),
  login: object({
    body: object({
      email: string().email().required(),
      password: string().min(8).required()
    }),
  })
}
