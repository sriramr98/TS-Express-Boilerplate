import TestRoute from './testRoute';
import RouterData from './../types/RouterData';
import BaseRouter from './BaseRouter';

class ApiRoutes extends BaseRouter {
  constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.initTestRoute();
  }

  private initTestRoute(): void {
    const testRoute = new TestRoute().getRouterData();
    this.router.use(testRoute.path, testRoute.router);
  }

  getRouterData(): RouterData {
    return {
      path: '/api',
      router: this.router,
    };
  }
}

export default ApiRoutes;
