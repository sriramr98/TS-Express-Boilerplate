import { Application } from 'express';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import globalLogger from '@utils/logger';

class Middlewares {
  private server: Application;

  private constructor(server: Application) {
    this.server = server;
    this.setupProdDeps();
    this.setupPino();
    this.setupDeps();
  }

  private setupDeps(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
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

  static init(server: Application) {
    return new Middlewares(server);
  }
}

export default Middlewares;
