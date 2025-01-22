import Fastify from 'fastify';
import { app } from './app/app';
import grpcPlugin from './app/plugins/grpc';
import { register } from 'prom-client';
import pinoPretty from 'pino-pretty';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const host = process.env.HOST ?? 'localhost';
const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});
server.log.info(`Include pino pretty ${pinoPretty.name}`);

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
