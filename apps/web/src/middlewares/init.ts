import { MiddlewareFactory } from '@web/lib/types/middleware-factory';
import { NextMiddleware, NextResponse } from 'next/server';

export default function init(middlewares: MiddlewareFactory[]): NextMiddleware {
  const current = middlewares.shift();
  if (current) {
    const next = init(middlewares);
    return current(next);
  }
  return () => NextResponse.next();
}
