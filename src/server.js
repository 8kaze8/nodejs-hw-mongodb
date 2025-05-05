import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:standard',
    },
  },
});

const pinoMiddleware = pinoHttp({
  logger,
  autoLogging: process.env.NODE_ENV === 'production',
});

export const setupServer = () => {
  const app = express();
  
  // Middleware

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
};