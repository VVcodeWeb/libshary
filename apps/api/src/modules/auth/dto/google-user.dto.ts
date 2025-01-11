import { z } from 'zod';

// export class GoogleLoginUserDtoLegacy {
//   providerAccountId: string;
//   email: string;
//   email_verified: string;
//   firstName: string;
//   lastName: string;
//   picture: string;
//   accessToken: string;
//   refreshToken: string;
//   id_token: string;
//   expires_in: number;
// }

export const GoogleLoginUserSchema = z.object({
  providerAccountId: z.string(),
  email: z.string().email(),
  email_verified: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string().url(),
  accessToken: z.string(),
  refreshToken: z.string(),
  id_token: z.string(),
  expires_in: z.number(),
});

export type GoogleLoginUserDto = z.infer<typeof GoogleLoginUserSchema>;
