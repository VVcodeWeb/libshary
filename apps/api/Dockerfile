FROM docker.io/node:lts-alpine as builder
COPY dist/apps/api ./
COPY libs/prisma ./prisma

RUN npm install --omit=dev
RUN npx prisma generate


FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init postgresql-client

ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app


COPY --from=builder . .
COPY --from=builder package.json ./package.json


RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
