import { Router } from 'express';
import { getContacts } from '../controllers/contacts.js';

const router = Router();

router.get('/', getContacts);

export default router;