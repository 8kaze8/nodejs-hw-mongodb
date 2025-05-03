import { Router } from 'express';
import contactsController from '../controllers/contacts.js';

const router = Router();

router.get('/', contactsController.getContacts);
router.get('/:contactId', contactsController.getContact);
router.post('/', contactsController.addContact);
router.patch('/:contactId', contactsController.patchContact);

export default router;