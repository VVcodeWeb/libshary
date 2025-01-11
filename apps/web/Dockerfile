FROM node:lts-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY dist/apps/web/ ./
COPY libs/prisma ./prisma


RUN npm ci

FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs
EXPOSE 4200
ENV PORT=4200

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
RUN echo ls -la .
CMD ["npm", "start"]