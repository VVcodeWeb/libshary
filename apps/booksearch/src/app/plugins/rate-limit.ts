import * as grpc from '@grpc/grpc-js';
import Redis from 'ioredis';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

interface RateLimitOptions {
  max: number;
  timeWindow: number;
  redisUrl: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    rateLimitInterceptor: (
      call: grpc.ServerUnaryCall<any, any>,
      callback: grpc.sendUnaryData<any>,
      next: () => Promise<void>,
    ) => Promise<void>;
  }
}

async function rateLimitPlugin(
  fastify: FastifyInstance,
  options: RateLimitOptions,
) {
  const redis = new Redis(options.redisUrl || fastify.config.redis_url);

  fastify.decorate(
    'rateLimitInterceptor',
    async (
      call: grpc.ServerUnaryCall<any, any>,
      callback: grpc.sendUnaryData<any>,
      next: () => Promise<void>,
    ) => {
      try {
        const provider =
          call.request.api === 1 ? 'open_library' : 'google_books';
        const key = `rate-limit:${provider}`;
        const current = await redis.incr(key);

        if (current === 1) {
          await redis.expire(key, options.timeWindow);
        }

        if (current > options.max) {
          const error = new grpc.StatusBuilder()
            .withCode(grpc.status.RESOURCE_EXHAUSTED)
            .withDetails(`Rate limit for ${provider} exceeded`)
            .build();
          return callback(error, null);
        }

        const remaining = Math.max(0, options.max - current);
        const reset = (await redis.pttl(key)) / 1000;

        const metadata = new grpc.Metadata();
        metadata.set('x-ratelimit-limit', options.max.toString());
        metadata.set('x-ratelimit-remaining', remaining.toString());
        metadata.set('x-ratelimit-reset', reset.toString());
        call.sendMetadata(metadata);

        await next();
      } catch (err) {
        fastify.log.error(err);
        const error = new grpc.StatusBuilder()
          .withCode(grpc.status.INTERNAL)
          .withDetails('Internal server error during rate limit')
          .build();
        callback(error, null);
      }
    },
  );
}
export const autoConfig = {
  max: 100,
  timeWindow: 60,
};
export default fp(rateLimitPlugin, {
  name: 'rate-limit',
  dependencies: ['config'],
});
