import Error from './Error';

interface ApiResponse<T> {
  isSuccess: boolean;
  data: T | null;
  error: Error | null;
}

export default ApiResponse;
