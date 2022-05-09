FROM node:16 AS development

WORKDIR /challenges/backend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run start:build

ENV port 5000
ENV NODE_ENV development

EXPOSE 5000

CMD [ "node", "dist/index.js" ]