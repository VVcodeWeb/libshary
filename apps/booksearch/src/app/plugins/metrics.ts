import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import * as grpc from '@grpc/grpc-js';

import {
  Counter,
  Histogram,
  collectDefaultMetrics,
  register,
} from 'prom-client';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { SearchApi } from '@booksearch/__generated_proto__/booksearch';

const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['service', 'status'],
});

const searchCounter = new Counter({
  name: 'provider_searches_total',
  help: 'Total number of searches per provider',
  labelNames: ['service', 'provider', 'status'],
});

const responseTimeHistogram = new Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['service', 'status'],
});

declare module 'fastify' {
  interface FastifyInstance {
    grpcMetricsInterceptor: (
      call: grpc.ServerUnaryCall<any, any>,
      callback: grpc.sendUnaryData<any>,
      next: () => Promise<void>,
    ) => Promise<void>;
  }
}

async function promMetrics(fastify: FastifyInstance) {
  collectDefaultMetrics({
    prefix: 'booksearch_',
  });

  fastify.get('/metrics', async (req, reply) => {
    reply.header('Content-Type', register.contentType);
    return await register.metrics();
  });

  const grpcMetricsInterceptor = async (
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>,
    next: () => Promise<void>,
  ) => {
    const start = process.hrtime();
    const status = grpc.status.OK.toString();
    const service = call.getPath();
    fastify.log.info({ service });
    try {
      await next();
    } catch (err) {
      const errorStatus = err.code || grpc.status.UNKNOWN;
      requestCounter.labels(service, errorStatus).inc();
      throw err;
    }

    const diff = process.hrtime(start);
    const responseTime = diff[0] + diff[1] / 1e9;

    responseTimeHistogram.labels(service, status).observe(responseTime);
    requestCounter.labels(service, status).inc();
    next();
  };

  const apiProviderMetrics = ({
    service,
    provider,
    status,
  }: {
    service: string;
    provider: SearchApi;
    status: Status;
  }) => {
    const providerName =
      provider === SearchApi.GOOGLE_BOOKS ? 'google_books' : 'open_library';
    searchCounter.labels(service, providerName, status.toString()).inc();
  };

  fastify.decorate('apiProviderMetrics', apiProviderMetrics);
  fastify.decorate('grpcMetricsInterceptor', grpcMetricsInterceptor);
}

export default fp(promMetrics, { name: 'metrics' });
