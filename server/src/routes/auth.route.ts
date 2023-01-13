import {IRouter, Router} from 'express';
import {login, logout, register} from '../controllers/auth.controller.js';

export const router: IRouter = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.delete('/auth/logout', logout);