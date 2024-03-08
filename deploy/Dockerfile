# Imagem de Origem
FROM node:20.10.0-slim

WORKDIR /app

ADD ./package*.json  /app/

RUN npm install

COPY . .

CMD npm run dev