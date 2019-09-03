import { Router } from 'express';
import RouterData from '../types/RouterData';

abstract class BaseRouter {
  protected router: Router;
  constructor() {
    this.router = Router();
  }

  abstract getRouterData(): RouterData;
}

export default BaseRouter;
