import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

export const Session = model('Session', sessionSchema);