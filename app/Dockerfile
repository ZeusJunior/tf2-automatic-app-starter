# syntax=docker/dockerfile:1
FROM node:20-alpine as build
ENV NODE_ENV=build
WORKDIR /app

ARG NODE_AUTH_TOKEN
COPY ./package.json ./yarn.lock ./
COPY ./.npmrc.ci ./.npmrc
COPY ./tsconfig.build.json ./tsconfig.json ./
RUN yarn global add @nestjs/cli
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20-alpine as production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "./dist/main.js"]