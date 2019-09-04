import express, { Request, Response } from 'express';
import ApiRoutes from './routes';
import Middlewares from './config/middlewares';
import { connectToMongo } from './config/mongoose';
import ApiResponse from './utils/ApiResponse';
import Result from './utils/Result';
import Error from './types/Error';
class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    connectToMongo();
    this.routes();
    // IMPORTANT : MAKE SURE THIS IS ALWAYS AT THE END OF THE CONSTRUCTOR
    this.setUnhandledRouteHandler();
  }

  private setUnhandledRouteHandler(): void {
    this.server.all('*', (req: Request, res: Response) => {
      const result = Result.failure({
        message: `Url ${req.url} not available`,
      });
      return new ApiResponse(res, result).notFound();
    });
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
