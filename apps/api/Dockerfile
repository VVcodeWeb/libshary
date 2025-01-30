FROM docker.io/node:lts-alpine AS builder
WORKDIR /app
COPY dist/apps/api ./
COPY libs/prisma/schema.prisma ./schema.prisma
COPY libs/grpc/src/protos/ ./libs/grpc/src/protos/
RUN npm install --omit=dev && npm install @bufbuild/protobuf && npx prisma generate


FROM docker.io/node:lts-alpine AS runner
WORKDIR /app
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

RUN apk add --no-cache dumb-init
COPY --from=builder /app .

RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
