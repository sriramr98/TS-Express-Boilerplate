import BaseException from './BaseException';

export default class PaymentRequiredException extends BaseException {
  getStatusCode(): number {
    return 402;
  }
}
