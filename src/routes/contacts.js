import { Router } from 'express';
import { getContacts, getContact } from '../controllers/contacts.js';

const router = Router();

router.get('/', getContacts);
router.get('/:contactId', getContact);

export default router;