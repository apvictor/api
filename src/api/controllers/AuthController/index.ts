import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { compareSync, hashSync } from "bcrypt"
import { ApiError } from "../../../configs/errors/ApiError";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateUserModel, UserDTO } from "../../models/UserModel";
import { UserRepository } from "../../repositories/UserRepository";
import { ERROR_USER_EMAIL_PASS } from "../../../configs/constants";

export const AuthController = {
  register: MapErrors(async (request: Request, response: Response) => {
    const userData: CreateUserModel = request.body;

    const passwordHash = await hashSync(userData.password, 10);

    const data = await UserRepository.insert({ ...userData, password: passwordHash });

    return response.json(data);
  }),

  login: MapErrors(async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const userExist = await UserRepository.getByEmail(email);
    if (!userExist) throw new ApiError(400, ERROR_USER_EMAIL_PASS);

    const match = compareSync(password, userExist.password);
    if (!match) throw new ApiError(400, ERROR_USER_EMAIL_PASS);

    const token = jwt.sign({ userId: userExist.id }, `${process.env.JWT_SECRET}`, { expiresIn: "8h" });

    const data: UserDTO = userExist;

    return response.json({ token, data });
  })
}
