import { Router } from "express";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { me } from "./me";
import { getUsers } from "./getUsers";

export const userRoutes = Router();

userRoutes.get("/users/me", UserAuth, me);
userRoutes.get("/users", getUsers);
