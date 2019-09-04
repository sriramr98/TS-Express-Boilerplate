import mongoose from 'mongoose';
import { logger } from './../utils/logger';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/vendordb';

export function connectToMongo(): void {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => logger.info(`Connected to mongodb`))
    .catch(err => logger.error('Error connecting to mongodb', err));
}
