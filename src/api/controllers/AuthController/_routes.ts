import { login } from "./login";
import { Router } from "express";
import { register } from "./register";
import { Validate } from "../../../shared/middlewares/Validate";
import { AuthValidation } from "../../validations/AuthValidation";

export const authRoutes = Router();

authRoutes.post("/register", Validate(AuthValidation.register), register);
authRoutes.post("/login", Validate(AuthValidation.login), login);
