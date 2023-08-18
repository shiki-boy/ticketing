# Common build stage
FROM node:18-alpine as base

COPY . ./app

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm i

# EXPOSE 3000

ENV NODE_ENV development

CMD ["pnpm", "dev"]
