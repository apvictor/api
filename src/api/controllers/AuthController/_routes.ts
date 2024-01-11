import { Router } from "express";
import { AuthController } from ".";
import { AuthValidation } from "../../validations/AuthValidation";
import { Validate } from "../../../shared/middlewares/Validate";

export const authRoutes = Router();

authRoutes.post("/register", Validate(AuthValidation.register), AuthController.register);
authRoutes.post("/login", Validate(AuthValidation.login), AuthController.login);
