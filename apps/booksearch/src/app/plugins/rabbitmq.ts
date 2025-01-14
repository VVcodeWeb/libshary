import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import amqp from 'amqplib';

declare module 'fastify' {
  interface FastifyInstance {
    rabbitmq: amqp.Channel;
  }
}
interface RabbitMqOptions {
  rabbitmq_url: string;
}

async function rabbitmq(fastify: FastifyInstance, options: RabbitMqOptions) {
  try {
    const rabbitmq_url = options.rabbitmq_url ?? fastify.config.rabbitmq_url;
    // fastify.log.info(`rabbitmq options ${JSON.stringify(options)}`);
    const connection = await amqp.connect(rabbitmq_url);
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
//TODO: auto config doesnt as function
export const autoConfig = (fastify: FastifyInstance) => {
  return {
    rabbitmq_url: fastify.config.rabbitmq_url,
  };
};

export default fp(rabbitmq, { name: 'rabbitmq', dependencies: ['config'] });
