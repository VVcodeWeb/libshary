import { z } from 'zod';

// export class UserJwtLegacy {
//   sub: string;
//   id_token: string;
//   access_token: string;
//   expires_at: string;
// }
export const UserJwtSchema = z.object({
  sub: z.string(),
  id_token: z.string(),
  access_token: z.string(),
  expires_at: z.string(),
});

export type UserJwtDto = z.infer<typeof UserJwtSchema>;
