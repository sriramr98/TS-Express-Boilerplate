import BaseException from './BaseException';

export default class NotFoudException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, NotFoudException.prototype);
  }

  getStatusCode(): number {
    return 404;
  }
}
