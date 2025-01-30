FROM docker.io/node:lts-alpine AS builder
WORKDIR /app
COPY dist/apps/booksearch ./

RUN npm instal --omit=dev && npm install @bufbuild/protobuf

FROM docker.io/node:lts-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV
COPY --from=builder /app .
RUN chown -R node:node .
USER node
EXPOSE 3001
CMD ["dumb-init", "node", "main.js"]
