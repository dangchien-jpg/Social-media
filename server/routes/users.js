import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get("/find/:userId", getUser)
router.put("/",authenticate, updateUser)


export default router;