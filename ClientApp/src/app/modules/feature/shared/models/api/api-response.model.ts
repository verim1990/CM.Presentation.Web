export interface ApiResponse<T> {
  RequestId: string;
  Result: T;
  StatusCode: number;
  Version: string;
}
