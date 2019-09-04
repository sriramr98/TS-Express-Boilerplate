import { Request, Response } from 'express';
import ApiResponse from './../utils/ApiResponse';
import Result from './../utils/Result';

class TestController {
  static getOneController(req: Request, res: Response): Response {
    const result = Result.success('Test one endpoint hit..');
    return new ApiResponse(res, result).apiSuccess();
  }

  static getAllController(req: Request, res: Response): Response {
    const result = Result.success('Get all Endpoint hit..');
    return new ApiResponse(res, result).apiSuccess();
  }
}

export default TestController;
