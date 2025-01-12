FROM docker.io/node:lts-alpine as builder
WORKDIR /app
COPY dist/apps/api ./
COPY libs/prisma/schema.prisma ./schema.prisma
RUN npm ci && npx prisma generate


FROM docker.io/node:lts-alpine as runner
WORKDIR /app

RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
COPY --from=builder /app .

RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
