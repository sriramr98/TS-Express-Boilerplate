import mongoose from 'mongoose';
import { logger } from '@utils/logger';
import Config from './config';

export function connectToMongo(): void {
  mongoose
    .connect(Config.MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => logger.info(`Connected to mongodb`))
    .catch(err => logger.error('Error connecting to mongodb', err));
}
