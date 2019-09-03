import express from 'express';

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
    this.server.use('/', (req, res) => {
      res.send('Typescript App works!!!');
    });
  }
}

export default new Server().server;
