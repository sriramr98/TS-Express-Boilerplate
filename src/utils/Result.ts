import ApiResponse from './../types/ApiResponse';
import Error from './../types/Error';

class Result<T> {
  private data: T;
  private isSuccess = false;
  private error: Error | null = null;

  constructor(data: T) {
    this.data = data;
  }

  success(): Result<T> {
    this.isSuccess = true;
    return this;
  }

  failure(err: Error | null): Result<T> {
    this.isSuccess = false;
    this.error = err;
    return this;
  }

  toObject(): ApiResponse<T> {
    return {
      data: this.data,
      isSuccess: this.isSuccess,
      error: this.error,
    };
  }
}

export default Result;
