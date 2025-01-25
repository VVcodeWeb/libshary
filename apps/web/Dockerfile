FROM node:lts-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY libs/prisma/schema.prisma ./schema.prisma
COPY dist/apps/web/package.json package-lock.json ./
RUN npm install --no-save prisma && npx prisma generate

FROM node:lts-alpine AS builder
WORKDIR /app

COPY dist/apps/web/.next/standalone/ ./
COPY dist/apps/web/.next/static dist/apps/web/.next/static
RUN rm -rf /app/node_modules/.prisma/client 

COPY --from=base /app/node_modules/.prisma/client /app/node_modules/.prisma/client

FROM node:lts-alpine AS runner
WORKDIR /app
ARG NODE_ENV
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/ ./

USER nextjs
EXPOSE $PORT

CMD ["node", "apps/web/server.js"]