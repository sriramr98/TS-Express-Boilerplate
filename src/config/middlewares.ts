import { Application } from 'express';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { morganOption } from '@config/winston';

class Middlewares {
  private server: Application;

  private constructor(server: Application) {
    this.server = server;
    this.setupProdDeps();
    this.setupDeps();
  }

  private setupDeps(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(morgan('combined', morganOption));
  }

  private setupProdDeps(): void {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(cors());
      this.server.use(helmet());
    }
  }

  static init(server: Application) {
    return new Middlewares(server);
  }
}

export default Middlewares;
