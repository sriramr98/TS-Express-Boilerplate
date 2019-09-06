import BaseException from './BaseException';

export default class ForbiddenException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
  getStatusCode(): number {
    return 402;
  }
}
