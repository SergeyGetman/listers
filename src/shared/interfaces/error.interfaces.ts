export interface ErrorType {
  errors: Record<string, string[]>;
  message: string;
  data?: {
    email?: string;
    phone?: string;
  };
  status?: number;
  email?: string;
  phone?: string;
}
