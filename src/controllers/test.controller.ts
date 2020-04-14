import { Request, Response } from 'express';

import Result from '@utils/Result';
class TestController {
  static getOneController(req: Request, res: Response): Response {
    const result = Result.success('Test one endpoint hit..');
    return res.json(result);
  }

  static getAllController(req: Request, res: Response): Response {
    const result = Result.success('Get all Endpoint hit..');
    return res.json(result);
  }

  static getProctectedRoute(req: Request, res: Response): Response {
    const { uid } = res.locals || {};
    const result = Result.success(
      `Protected endpoint working. Logged in with ${uid}`,
    );
    return res.json(result);
  }
}

export default TestController;
