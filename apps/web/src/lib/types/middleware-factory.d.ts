import { NextMiddleware } from 'next/server';

declare type MiddlewareFactory = (next: NextMiddleware) => NextMiddleware;
