import BaseException from './BaseException';

export default class PaymentRequiredException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, PaymentRequiredException.prototype);
  }
  getStatusCode(): number {
    return 402;
  }
}
