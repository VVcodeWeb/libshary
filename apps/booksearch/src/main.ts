import Fastify from 'fastify';
import { app } from './app/app';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const host = process.env.HOST ?? 'localhost';

const server = Fastify({
  logger: true,
});

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
