import { Contact } from '../db/Contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts
    };
  } catch (error) {
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return {
        status: 404,
        message: 'Contact not found'
      };
    }
    return {
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact
    };
  } catch (error) {
    throw error;
  }
};