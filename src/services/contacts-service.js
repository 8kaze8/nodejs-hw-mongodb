import { Contact } from '../db/Contact.js';
import createError from 'http-errors';
import mongoose from 'mongoose';

export const getAllContacts = async (
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite,
) => {
  try {
    const skip = (page - 1) * perPage;

    // Filtreleme koşullarını oluştur
    const filter = { userId };
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite;

    const totalItems = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / perPage);

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const contacts = await Contact.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getContactById = async (userId, contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    return {
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
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
      data: contact,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw createError(400, error.message);
    }
    throw error;
  }
};

export const updateContact = async (userId, contactId, updateData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createError(404, 'Contact not found');
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      updateData,
      { new: true, runValidators: true },
    );

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    return {
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw createError(400, error.message);
    }
    throw error;
  }
};

export const deleteContact = async (userId, contactId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createError(404, 'Contact not found');
    }

    const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    return {
      status: 204,
    };
  } catch (error) {
    throw error;
  }
};
