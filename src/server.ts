import express, { Request, Response, NextFunction } from 'express';
import ApiRoutes from '@routes/index';
import Middlewares from '@config/middlewares';
import { connectToMongo } from '@config/mongoose';
import NotFoudException from '@utils/exceptions/NotFoundException';
import globalErrorHandler from '@config/globalErrorHandler';
import connectToFirebase from '@config/firebase';

const server = express();

// init middlewares
Middlewares.init(server);

connectToMongo();
connectToFirebase();

// setup routes
const apiRoutesData = new ApiRoutes().getRouterData();
server.use(apiRoutesData.path, apiRoutesData.router);

// common error handler
server.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoudException(`Path ${req.url} not found`));
});

// global error handler
server.use(globalErrorHandler);

export default server;
