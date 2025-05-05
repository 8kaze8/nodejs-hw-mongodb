import { User } from '../db/User.js';
import bcrypt from 'bcrypt';
import createError from 'http-errors';

export const register = async (userData) => {
  try {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return {
      status: 201,
      message: 'Successfully registered a user!',
      data: userResponse
    };
  } catch (error) {
    throw error;
  }
};