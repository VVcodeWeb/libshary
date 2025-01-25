const configuration = (): ConfigurationType => ({
  jwt_secret: process.env.JWT_SECRET || 'secret',
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  google_redirect_url:
    (process.env.GOOGLE_REDIRECT_URL as string) ||
    'http://localhost:3000/auth/google/redirect',
  process_api_data:
    !process.env.DATA || process.env.NODE_ENV === 'production'
      ? false
      : process.env.DATA === 'true',
  booksearch_grpc: process.env.BOOKSEARCH_GRPC || '0.0.0.0:50051',
  web_host: process.env.WEB_URL || 'localhost:3000',
  port: process.env.PORT || 3000,
  node_env:
    (process.env.NODE_ENV as ConfigurationType['node_env']) || 'development',
});

export interface ConfigurationType {
  jwt_secret: string;
  process_api_data: boolean;
  google_client_secret: string;
  google_client_id: string;
  google_redirect_url: string;
  booksearch_grpc: string;
  web_host: string;
  port: string | number;
  node_env: 'development' | 'production';
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
