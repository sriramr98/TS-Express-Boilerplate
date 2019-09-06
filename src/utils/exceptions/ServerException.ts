import BaseException from './BaseException';

export default class ServerException extends BaseException {
  getStatusCode(): number {
    return 500;
  }
}
