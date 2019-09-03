import { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import globalLogger from './utils/logger';

class Middlewares {
  private server: Application;

  constructor(server: Application) {
    this.server = server;
    server.use(cors());
    server.use(helmet());
    this.setupPino();
  }

  private setupPino(): void {
    this.server.use(globalLogger.expressLogger);
  }
}

export default Middlewares;
