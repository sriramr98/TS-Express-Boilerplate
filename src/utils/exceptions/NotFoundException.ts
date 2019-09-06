import BaseException from './BaseException';

export default class NotFoudException extends BaseException {
  getStatusCode(): number {
    return 404;
  }
}
