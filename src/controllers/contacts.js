import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getContacts = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const result = await getAllContacts(page, perPage);
  res.status(result.status).json(result);
};

const getContact = async (req, res) => {
  const result = await getContactById(req.params.contactId);
  res.status(result.status).json(result);
};

const addContact = async (req, res) => {
  const result = await createContact(req.body);
  res.status(result.status).json(result);
};

const patchContact = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  res.status(result.status).json(result);
};

const removeContact = async (req, res) => {
  const result = await deleteContact(req.params.contactId);
  res.status(result.status).send();
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  patchContact: ctrlWrapper(patchContact),
  removeContact: ctrlWrapper(removeContact)
};