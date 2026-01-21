import express from 'express'
import { register, login, logout } from '../controllers/auth.controller.js';
import { authenticate, validateRegister } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/register",validateRegister, register)
router.post("/login", login)
router.post("/logout",authenticate, logout)

export default router
