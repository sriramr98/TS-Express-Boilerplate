import express, { Request, Response, NextFunction } from 'express';
import ApiRoutes from './routes';
import Middlewares from './config/middlewares';
import { connectToMongo } from './config/mongoose';
import ApiResponse from './utils/ApiResponse';
import Result from './utils/Result';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    connectToMongo();
    this.routes();
    // IMPORTANT : MAKE SURE THIS IS ALWAYS AT THE END OF THE CONSTRUCTOR
    this.setErrorMiddlewares();
  }

  private setErrorMiddlewares(): void {
    this.server.all('*', (req: Request, res: Response) => {
      const result = Result.failure({
        message: `Url ${req.url} not available`,
      });
      return new ApiResponse(res, result).notFound();
    });

    this.server.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const result = Result.failure({
          message: 'Something went wrong from the server',
        });
        return new ApiResponse(res, result).serverError();
      },
    );
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
