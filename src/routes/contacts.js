import { Router } from 'express';
import contactsController from '../controllers/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../schemas/contact.js';

const router = Router();

router.get('/', contactsController.getContacts);
router.get('/:contactId', isValidId, contactsController.getContact);
router.post('/', validateBody(createContactSchema), contactsController.addContact);
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), contactsController.patchContact);
router.delete('/:contactId', isValidId, contactsController.removeContact);

export default router;