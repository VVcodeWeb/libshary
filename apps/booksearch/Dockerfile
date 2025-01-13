FROM docker.io/node:lts-alpine as builder
WORKDIR /app
COPY dist/apps/booksearch ./
RUN npm ci 

FROM docker.io/node:lts-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init
ARG NODE_ENV
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
COPY --from=builder /app .
RUN chown -R node:node .
USER node
EXPOSE $PORT
CMD ["dumb-init", "node", "main.js"]
