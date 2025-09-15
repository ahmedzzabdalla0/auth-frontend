export interface ErrorInterface {
  response?: {
    data?: { message?: string };
    originalStatus?: number;
    status?: number;
  };
  message?: string;
  code?: string;
}
