import { Request } from "express";
import { UserDTO } from "../../api/models/UserModel";

export interface UserAuthRequest extends Request {
  userAuth: UserDTO,
  query: {
    type?: "INCOME" | "EXPENSE",
    search?: string
    month?: string
  },
}
