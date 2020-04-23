import mongoose from 'mongoose';
import logger from '@config/winston';
import Config from './config';

mongoose.Promise = global.Promise;

export function connectToMongo(): void {
  mongoose
    .connect(Config.MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => logger.error('Error connecting to mongodb', err));
}
