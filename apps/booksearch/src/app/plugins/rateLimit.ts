import { BookQueryRequestDto, SearchApi } from '@libshary/shared-types';
import { FastifyInstance, FastifyRequest } from 'fastify';
import Redis from 'ioredis';
import fp from 'fastify-plugin';
interface RateLimitOptions {
  max: number;
  timeWindow: number;
  redisUrl: string;
}
async function rateLimitPlugin(
  fastify: FastifyInstance,
  options: RateLimitOptions,
) {
  fastify.log.info(`rateLimitPlugin options ${options}`);
  const redisUrl = options.redisUrl ?? fastify.config.redis_url; //TODO: auto config doesnt as function
  const redis = new Redis(redisUrl);

  fastify.addHook(
    'onRequest',
    async (
      req: FastifyRequest<{ Querystring: BookQueryRequestDto }>,
      reply,
    ) => {
      if (!req.raw.url?.startsWith('/search')) return;

      const provider = req.query.api ?? SearchApi.google_books; //TODO: handle default provider logic elswhere
      const key = `rate-limit:${provider}`;
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, options.timeWindow);
      }

      if (current > options.max) {
        reply.status(429).send({ message: 'Rate limit exceeded' });
      }
      reply.header('X-RateLimit-Limit', options.max);
      reply.header('X-RateLimit-Remaining', Math.max(0, options.max - current));
      reply.header('X-RateLimit-Reset', (await redis.pttl(key)) / 1000);
    },
  );
}
export const autoConfig = {
  max: 25,
  timeWindow: 60000,
};
export default fp(rateLimitPlugin, {
  name: 'rate-limit',
  dependencies: ['config'],
});
