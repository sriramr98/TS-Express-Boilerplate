import { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import globalLogger from '../utils/logger';

class Middlewares {
  private server: Application;

  constructor(server: Application) {
    this.server = server;
    this.setupProdDeps();
    this.setupPino();
  }

  private setupProdDeps(): void {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(cors());
      this.server.use(helmet());
    }
  }

  private setupPino(): void {
    this.server.use(globalLogger.expressLogger);
  }
}

export default Middlewares;
