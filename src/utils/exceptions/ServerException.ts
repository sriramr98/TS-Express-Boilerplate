import BaseException from './BaseException';

export default class ServerException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, ServerException.prototype);
  }

  getStatusCode(): number {
    return 500;
  }
}
