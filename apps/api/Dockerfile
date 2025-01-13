FROM docker.io/node:lts-alpine as builder
WORKDIR /app
COPY dist/apps/api ./
COPY libs/prisma/schema.prisma ./schema.prisma
RUN npm ci && npx prisma generate


FROM docker.io/node:lts-alpine as runner
WORKDIR /app
ARG NODE_ENV
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

RUN apk add --no-cache dumb-init
COPY --from=builder /app .

RUN chown -R node:node .
USER node
EXPOSE $PORT
CMD ["dumb-init", "node", "main.js"]
