/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const signJwt = (payload: any, expiresIn = '1d') => {
  const token = jwt.sign(payload, process.env.NEXTAUTH_SECRET as string, {
    algorithm: 'HS512',
    expiresIn,
  });
  return token;
};

export const verifyJwt = (token: string) => {
  const data = jwt.verify(token, process.env.NEXTAUTH_SECRET as string, {
    algorithms: ['HS512'],
  });
  return data;
};
