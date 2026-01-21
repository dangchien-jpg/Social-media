import express from 'express'
import { destroy, index, store } from '../controllers/like.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get("/", index);
router.post("/", authenticate, store);
router.delete("/", authenticate, destroy);



export default router