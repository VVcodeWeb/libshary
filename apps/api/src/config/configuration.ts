const configuration = (): ConfigurationType => ({
  jwt_secret: process.env.JWT_SECRET || 'secret',
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  book_search_url:
    (process.env.BOOK_SEARCH_URL as string) || 'http://localhost:3001',
  google_redirect_url:
    (process.env.GOOGLE_REDIRECT_URL as string) ||
    'http://localhost:3000/auth/google/redirect',
  process_api_data:
    !process.env.DATA || process.env.NODE_ENV === 'production'
      ? false
      : process.env.DATA === 'true',
  booksearch_grpc: process.env.BOOKSEARCH_GRPC || '0.0.0.0:50051',
  rabbitmq_url: process.env.RABBITMQ_URL as string,
  web_url: process.env.WEB_URL,
});

export interface ConfigurationType {
  jwt_secret: string;
  process_api_data: boolean;
  google_client_secret: string;
  google_client_id: string;
  google_redirect_url: string;
  book_search_url: string;
  booksearch_grpc: string;
  rabbitmq_url: string;
  web_url: string;
}

export const validate = (config: Record<string, any>) => {
  const required = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
  const missing: string[] = required.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing configuration: ${missing.join(', ')}`);
  }
  return config;
};

export default configuration;
