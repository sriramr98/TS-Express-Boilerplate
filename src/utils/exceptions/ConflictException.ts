import BaseException from './BaseException';

export default class ConflictException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
  getStatusCode(): number {
    return 409;
  }
}
