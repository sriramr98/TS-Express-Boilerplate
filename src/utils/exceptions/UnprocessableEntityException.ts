import BaseException from './BaseException';

export default class UnprocessableEntityException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, UnprocessableEntityException.prototype);
  }
  getStatusCode(): number {
    return 422;
  }
}
