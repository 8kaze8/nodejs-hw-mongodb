import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

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

const swaggerDocument = JSON.parse(
  fs.readFileSync('./docs/swagger.json', 'utf8'),
);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pinoMiddleware);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
};
