import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContacts = async (req, res) => {
  try {
    const result = await getAllContacts();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const result = await getContactById(req.params.contactId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};