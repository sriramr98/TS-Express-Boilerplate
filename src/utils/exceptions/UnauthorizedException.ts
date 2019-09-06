import BaseException from './BaseException';

export default class UnauthorizedException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
  getStatusCode(): number {
    return 401;
  }
}
