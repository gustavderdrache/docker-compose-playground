# Asset build container definition

# Useful notes:
# * The front-end application sources must always be mounted to /app/src
# * When doing a webpack build, ensure that /app/build is mounted to the host filesystem

FROM node:carbon

WORKDIR /app

# 1. Copy package configuration and install (only dev deps)
COPY package*.json ./
RUN npm install --only=development

# 2. Copy build configuration
# NB. Unlike the server container, we don't copy sources
# (this is needed for local development to work).
COPY webpack.config.js tsconfig.json .babelrc .env.example ./

ENV NODE_ENV production
CMD npm run build

# NB. To run webpack-dev-server, use "docker run <client> npm start" instead
# See docker-compose.yml for an example.