import BaseException from './BaseException';

export default class UnauthorizedException extends BaseException {
  getStatusCode(): number {
    return 401;
  }
}
