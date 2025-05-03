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