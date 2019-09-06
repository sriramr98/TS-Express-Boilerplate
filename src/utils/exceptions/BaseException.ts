import AppError from '../../types/AppError';

export default abstract class BaseException extends Error {
  private errorCode: string | undefined;
  constructor(message: string, errorCode: string | undefined) {
    super(message);
    this.errorCode = errorCode;
  }
  getError(): AppError {
    return {
      message: this.message,
      errorCode: this.errorCode,
    };
  }
  abstract getStatusCode(): number;
}
