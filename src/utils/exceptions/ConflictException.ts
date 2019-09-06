import BaseException from './BaseException';

export default class ConflictException extends BaseException {
  getStatusCode(): number {
    return 409;
  }
}
