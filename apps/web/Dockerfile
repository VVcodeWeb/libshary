FROM node:lts-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY libs/prisma/schema.prisma ./schema.prisma
COPY dist/apps/web/package.json package-lock.json ./
RUN npm install --no-save prisma && npx prisma generate

FROM node:lts-alpine AS builder
WORKDIR /app

COPY dist/apps/web/.next/standalone/ ./
RUN rm -rf /app/node_modules/.prisma/client 

COPY dist/apps/web/.next/static/ ./.next/static
COPY --from=base /app/node_modules/.prisma/client /app/node_modules/.prisma/client

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/ ./

USER nextjs
EXPOSE 4200
ENV PORT=4200

CMD ["node", "apps/web/server.js"]