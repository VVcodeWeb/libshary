import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.post('/send', async function (request, reply) {
    const { message } = request.body as { message: string };
    const channel = fastify.rabbitmq;

    channel.sendToQueue('logs', Buffer.from(message));
    reply.send({ status: 'Message sent to RabbitMQ' });
  });
}
