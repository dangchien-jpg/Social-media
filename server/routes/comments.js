import express from 'express'
import { index, store } from '../controllers/comment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", index);
router.post("/", authenticate,store)

export default router