import AppError from './AppError';

interface ApiResponse<T> {
  isSuccess: boolean;
  data: T | null;
  error: AppError | null;
}

export default ApiResponse;
