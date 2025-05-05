import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts-service.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  // isFavourite string olarak geliyor, boolean'a çevir
  const isFavouriteBoolean =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  const result = await getAllContacts(
    req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavouriteBoolean,
  );
  res.status(result.status).json(result);
};

const getContact = async (req, res) => {
  const result = await getContactById(req.user._id, req.params.contactId);
  res.status(result.status).json(result);
};

const addContact = async (req, res) => {
  const contactData = { ...req.body, userId: req.user._id };
  const result = await createContact(contactData);
  res.status(result.status).json(result);
};

const patchContact = async (req, res) => {
  const result = await updateContact(
    req.user._id,
    req.params.contactId,
    req.body,
  );
  res.status(result.status).json(result);
};

const removeContact = async (req, res) => {
  const result = await deleteContact(req.user._id, req.params.contactId);
  res.status(result.status).send();
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  patchContact: ctrlWrapper(patchContact),
  removeContact: ctrlWrapper(removeContact),
};
