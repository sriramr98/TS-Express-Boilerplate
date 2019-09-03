import express from 'express';
import ApiRoutes from './routes';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    const routesData = new ApiRoutes().getRouterData();
    this.server.use(routesData.path, routesData.router);
  }
}

export default new Server().server;
