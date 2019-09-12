import { Router } from 'express';

import TestController from './../controllers/test.controller';
import RouterData from './../types/RouterData';
import BaseRouter from './BaseRouter';
import authenticateUser from './../middlewares/authenticateUser';

class TestRoutes extends BaseRouter {
  constructor() {
    super();
    this.getOneTestRoute();
    this.getAllTestRoute();
    this.getProtectedRoute();
  }

  getOneTestRoute(): Router {
    return this.router.get('/one', TestController.getOneController);
  }

  getAllTestRoute(): Router {
    return this.router.get('/all', TestController.getAllController);
  }

  getProtectedRoute(): Router {
    return this.router.get(
      '/protected',
      authenticateUser,
      TestController.getProctectedRoute,
    );
  }

  getRouterData(): RouterData {
    return {
      path: '/test',
      router: this.router,
    };
  }
}

export default TestRoutes;
