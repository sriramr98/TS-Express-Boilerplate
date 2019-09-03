import express from 'express';
import ApiRoutes from './routes';
import Middlewares from './middlewares';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
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
