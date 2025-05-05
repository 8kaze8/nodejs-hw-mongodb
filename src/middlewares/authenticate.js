import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../db/User.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError(401, 'No access token provided');
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createError(401, 'Access token expired');
      }
      throw createError(401, 'Invalid access token');
    }
    const user = await User.findById(payload.userId);
    if (!user) {
      throw createError(401, 'User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
