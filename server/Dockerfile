FROM node:carbon-alpine AS build

WORKDIR /app-src/
COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install && npm run build

FROM node:carbon-alpine

WORKDIR /app/
COPY --from=build /app-src/package*.json ./
COPY --from=build /app-src/lib ./lib

RUN npm install --only=production

CMD npm start