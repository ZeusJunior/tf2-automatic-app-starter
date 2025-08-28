# syntax=docker/dockerfile:1
FROM node:20-alpine AS build
ENV NODE_ENV=build
WORKDIR /app

ARG NODE_AUTH_TOKEN
COPY . .
RUN yarn global add @nestjs/cli \
    && yarn install --frozen-lockfile \
    && yarn build

FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "./dist/main.js"]