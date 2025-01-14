import { BookQueryReponseDto, SearchApi } from '@libshary/shared-types';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import {
  Counter,
  Histogram,
  collectDefaultMetrics,
  register,
} from 'prom-client';

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const searchCounter = new Counter({
  name: 'provider_searches_total',
  help: 'Total number of searches per provider',
  labelNames: ['provider', 'status'],
});

const responseTimeHistogram = new Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route', 'status'],
});

async function promMetrics(fastify: FastifyInstance) {
  collectDefaultMetrics({
    prefix: 'booksearch_',
  });

  fastify.get('/metrics', async (req, reply) => {
    reply.header('Content-Type', register.contentType);
    return register.metrics();
  });
  fastify.addHook('onRequest', (req, reply, done) => {
    const { method, status, url } = retrieveRequestData(req, reply);

    if (url === '/metrics' || url === '/health') {
      done();
    }
    requestCounter.labels(method, url, status).inc();
    done();
  });

  fastify.addHook('onResponse', (req, reply, done) => {
    const { method, status, url } = retrieveRequestData(req, reply);
    const responseTime = reply.getResponseTime() / 1000;
    responseTimeHistogram.labels(method, url, status).observe(responseTime);
    done();
  });

  fastify.addHook(
    'onSend',
    (req, reply, payload: BookQueryReponseDto, done) => {
      const route = req.routerPath;
      const status = reply.statusCode;
      if (route.startsWith('/search')) {
        searchCounter.labels(payload.api_provider, String(status)).inc();
      }
      done();
    },
  );

  const retrieveRequestData = (req: FastifyRequest, reply: FastifyReply) => {
    return {
      method: req.raw.method ?? 'unknown',
      url: req.raw.url ?? 'unknown',
      status: String(reply.statusCode),
    };
  };
}

export default fp(promMetrics, { name: 'prom-metrics' });
