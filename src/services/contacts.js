import { Contact } from '../db/Contact.js';
import createError from 'http-errors';
import mongoose from 'mongoose';

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
      throw createError(404, 'Contact not found');
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

export const createContact = async (contactData) => {
  try {
    const contact = await Contact.create(contactData);
    return {
      status: 201,
      message: 'Successfully created a contact!',
      data: contact
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw createError(400, error.message);
    }
    throw error;
  }
};

export const updateContact = async (contactId, updateData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createError(404, 'Contact not found');
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    return {
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw createError(400, error.message);
    }
    throw error;
  }
};