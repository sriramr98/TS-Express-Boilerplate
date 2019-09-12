import express, { Request, Response, NextFunction } from 'express';
import ApiRoutes from './routes';
import Middlewares from './config/middlewares';
import { connectToMongo } from './config/mongoose';
import NotFoudException from './utils/exceptions/NotFoundException';
import globalErrorHandler from './config/globalErrorHandler';
import connectToFirebase from './config/firebase';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    connectToMongo();
    // connectToFirebase();
    this.routes();
    // IMPORTANT : MAKE SURE THIS IS ALWAYS AT THE END OF THE CONSTRUCTOR
    this.setErrorMiddlewares();
  }

  private setErrorMiddlewares(): void {
    this.server.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(new NotFoudException(`Path ${req.url} not found`));
    });

    this.server.use(globalErrorHandler);
  }

  // Configure Express middleware.
  private middleware(): void {
    new Middlewares(this.server);
  }

  private routes(): void {
    const routesData = new ApiRoutes().getRouterData();
    this.server.use(routesData.path, routesData.router);
  }
}

export default new Server().server;
