import BaseException from './BaseException';

export default class ClientErrorException extends BaseException {
  getStatusCode(): number {
    return 400;
  }
}
