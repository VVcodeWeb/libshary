import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/health', async function () {
    return { message: 'Hello API' };
  });
}
