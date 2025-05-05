import { User } from '../db/User.js';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { Session } from '../db/Session.js';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60; // 15 dakika (saniye cinsinden)
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60; // 30 gün (saniye cinsinden)

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
      password: hashedPassword,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return {
      status: 201,
      message: 'Successfully registered a user!',
      data: userResponse,
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (loginData, res) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password');
  }

  // Eski session'ı sil
  await Session.deleteMany({ userId: user._id.toString() });

  // Tokenler
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  const now = new Date();
  const accessTokenValidUntil = new Date(
    now.getTime() + ACCESS_TOKEN_EXPIRES_IN * 1000,
  );
  const refreshTokenValidUntil = new Date(
    now.getTime() + REFRESH_TOKEN_EXPIRES_IN * 1000,
  );

  await Session.create({
    userId: user._id.toString(),
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  // Refresh tokeni cookie'ye kaydet
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_EXPIRES_IN * 1000,
  });

  return {
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken },
  };
};
