import BaseException from './BaseException';

export default class TooManyException extends BaseException {
  getStatusCode(): number {
    return 429;
  }
}
