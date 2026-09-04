FROM node:22-alpine

RUN npm install -g @nestjs/cli

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app




