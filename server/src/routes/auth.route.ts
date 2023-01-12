import {Router} from 'express';
import {login, logout, register} from '../controllers/auth.controller.js';

export const router: Router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.delete('/auth/logout', logout);