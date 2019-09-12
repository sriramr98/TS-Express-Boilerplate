import { Request, Response } from 'express';

import Result from './../utils/Result';
class TestController {
  static getOneController(req: Request, res: Response): Response {
    const result = Result.success('Test one endpoint hit..');
    return res.json(result.toObject());
  }

  static getAllController(req: Request, res: Response): Response {
    const result = Result.success('Get all Endpoint hit..');
    return res.json(result.toObject());
  }

  static getProctectedRoute(req: Request, res: Response): Response {
    const result = Result.success('Protected endpoint working');
    return res.json(result.toObject());
  }
}

export default TestController;
