import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';
declare module 'fastify' {
  interface FastifyInstance {
    config: configType;
  }
}
const configSchema = z.object({
  open_library_url: z.string().url(),
  google_books_url: z.string().url(),
  google_books_api_key: z.string().nonempty(),
  rabbitmq_url: z.string().url(),
  node_env: z.enum(['development', 'production']),
});
type configType = z.infer<typeof configSchema>;

async function config(
  fastify: FastifyInstance,
  options: { config: configType },
) {
  const parsedConfig = configSchema.parse(options.config);
  fastify.decorate('config', parsedConfig);
}

export default fp(config, { name: 'config' });
