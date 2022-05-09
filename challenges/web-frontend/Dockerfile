# stage 1: build
FROM node:16 AS development

WORKDIR /challenges/frontend/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@13.1.3

COPY . .

RUN npm run build

ENV PORT 4200
ENV NODE_ENV development

EXPOSE 4200