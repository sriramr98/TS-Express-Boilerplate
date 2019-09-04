import ApiResponse from './../types/ApiResponse';
import Error from './../types/Error';

class Result<T> {
  private data: T | null;
  private isSuccess = false;
  private error: Error | null = null;

  private constructor(
    isSuccess: boolean,
    data: T | null = null,
    error: Error | null = null,
  ) {
    this.data = data;
    this.isSuccess = isSuccess;
    this.error = error;
  }

  static success<T>(data: T): Result<T> {
    return new Result(true, data);
  }

  static failure<T>(err: Error | null): Result<T> {
    return new Result<T>(false, null, err);
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
