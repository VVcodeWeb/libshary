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
});

export interface ConfigurationType {
  jwt_secret: string;
  process_api_data: boolean;
  google_client_secret: string;
  google_client_id: string;
  google_redirect_url: string;
  book_search_url: string;
}

export const validate = (config: Record<string, any>) => {
  const missing: string[] = [];
  if (missing.length > 0) {
    throw new Error(`Missing configuration: ${missing.join(', ')}`);
  }
  return config;
};

export default configuration;

// const localDevelopmentEnvPath = path.join(
//   process.cwd(),
//   'env/api/.env.development',
// );

// ConfigModule.forRoot({
//     // NestJS can't validate Zod natively, we need to use a custom validation function
//     validate: () => {
//         const stage = process.env.STAGE;

//         if (!stage) {
//             console.log(
//                 `STAGE env not defined, will try to load: ${localDevelopmentEnvPath}`
//             );

//             if (!fs.existsSync(localDevelopmentEnvPath)) {
//                 console.log(
//                     `File ${localDevelopmentEnvPath} does not exist!`
//                 );
//                 process.exit(1);
//             }

//             dotenv.config({ path: './env/api/.env.development' });
//         }

//         // apiEnvironmentValidationSchema is a Zod schema here
//         return apiEnvironmentValidationSchema.parse(process.env);
//     }
// })
