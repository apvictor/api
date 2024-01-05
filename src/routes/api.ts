import { Router } from 'express';

import { authRoutes } from '../api/controllers/AuthController/_routes';
import { userRoutes } from '../api/controllers/UserController/_routes';
import { accountRoutes } from '../api/controllers/AccountController/_routes';
import { costCenterRoutes } from '../api/controllers/CostCenterController/_routes';
import { transactionRoutes } from '../api/controllers/TransactionController/_routes';

export const api = Router();

api.use(authRoutes);
api.use(accountRoutes);
api.use(costCenterRoutes);
api.use(userRoutes);
api.use(transactionRoutes);
