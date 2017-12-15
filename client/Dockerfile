FROM node:carbon-alpine

WORKDIR /app
COPY package*.json webpack.config.js ./

RUN npm install

EXPOSE 80

CMD npm start