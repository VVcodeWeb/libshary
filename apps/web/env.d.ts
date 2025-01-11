declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      API_URL: string;
    }
  }
}
