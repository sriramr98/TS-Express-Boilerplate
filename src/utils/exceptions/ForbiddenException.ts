import BaseException from './BaseException';

export default class ForbiddenException extends BaseException {
  getStatusCode(): number {
    return 402;
  }
}
