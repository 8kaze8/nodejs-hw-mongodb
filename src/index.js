import 'dotenv/config';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const startApp = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
};

startApp();