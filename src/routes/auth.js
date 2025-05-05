import { Router } from 'express';
import authController from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema } from '../schemas/auth.js';

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);

export default router;