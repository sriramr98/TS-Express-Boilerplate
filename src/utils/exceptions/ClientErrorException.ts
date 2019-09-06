import BaseException from './BaseException';

export default class ClientErrorException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, ClientErrorException.prototype);
  }

  getStatusCode(): number {
    return 400;
  }
}
