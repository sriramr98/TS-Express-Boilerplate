import { Response } from 'express';
import Result from './Result';

class ApiResponse<T> {
  private result: Result<T>;
  private response: Response;

  constructor(response: Response, result: Result<T>) {
    this.response = response;
    this.result = result;
  }

  created(): Response {
    return this.finalResponse(201);
  }

  apiSuccess(): Response {
    return this.finalResponse(200);
  }

  clientError(): Response {
    return this.finalResponse(400);
  }

  unauthorized(): Response {
    return this.finalResponse(401);
  }

  paymentRequired(): Response {
    return this.finalResponse(402);
  }

  forbidden(): Response {
    return this.finalResponse(403);
  }

  notFound(): Response {
    return this.finalResponse(404);
  }

  conflict(): Response {
    return this.finalResponse(409);
  }

  tooMany(): Response {
    return this.finalResponse(429);
  }

  serverError(): Response {
    return this.finalResponse(500);
  }

  private finalResponse(statusCode: number): Response {
    return this.response.status(statusCode).json(this.result.toObject());
  }
}

export default ApiResponse;
