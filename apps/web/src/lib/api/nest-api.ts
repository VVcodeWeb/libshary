'use server';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth-config';

//TODO: Implement properly
const api = axios.create({
  validateStatus: (status) => status === 200 || status === 201,
  withCredentials: true,
  baseURL: process.env.API_URL || 'http://localhost:3000',
});
api.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);

  config.headers.Authorization = `Bearer ${session?.auth_token}`;
  return config;
});

export default api;
