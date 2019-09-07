import BaseException from './BaseException';

export default class TooManyException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, TooManyException.prototype);
  }

  getStatusCode(): number {
    return 429;
  }
}
