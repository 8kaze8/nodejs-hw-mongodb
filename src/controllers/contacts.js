import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts-service.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  let photoUrl = null;
  if (req.file) {
    const uploadResult = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) throw error;
        photoUrl = result.secure_url;
      },
    );
    await new Promise((resolve, reject) => {
      const stream = uploadResult;
      stream.on('finish', resolve);
      stream.on('error', reject);
      stream.end(req.file.buffer);
    });
  }
  const contactData = { ...req.body, userId: req.user._id };
  if (photoUrl) contactData.photo = photoUrl;
  const result = await createContact(contactData);
  res.status(result.status).json(result);
};

const patchContact = async (req, res) => {
  let photoUrl = null;
  if (req.file) {
    const uploadResult = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) throw error;
        photoUrl = result.secure_url;
      },
    );
    await new Promise((resolve, reject) => {
      const stream = uploadResult;
      stream.on('finish', resolve);
      stream.on('error', reject);
      stream.end(req.file.buffer);
    });
  }
  const updateData = { ...req.body };
  if (photoUrl) updateData.photo = photoUrl;
  const result = await updateContact(
    req.user._id,
    req.params.contactId,
    updateData,
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
