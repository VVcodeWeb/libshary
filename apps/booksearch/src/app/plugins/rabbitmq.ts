import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import amqp from 'amqplib';

declare module 'fastify' {
  interface FastifyInstance {
    rabbitmq: amqp.Channel;
  }
}

async function rabbitmq(fastify: FastifyInstance) {
  try {
    const connection = await amqp.connect(fastify.config.rabbitmq_url);
    const channel = await connection.createChannel();

    fastify.decorate('rabbitmq', channel);

    fastify.addHook('onClose', (fastifyInstance, done) => {
      connection.close();
      done();
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

export default fp(rabbitmq, { name: 'rabbitmq' });
