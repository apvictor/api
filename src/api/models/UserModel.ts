export type UserDTO = Omit<UserModel, "password">

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserModel {
  name: string;
  email: string;
  password: string;
}
