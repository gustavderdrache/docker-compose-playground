# Build stage
#############

FROM node:carbon AS build

# 1. Copy package configuration and install all dependencies
WORKDIR /app-src/
COPY package*.json ./
RUN npm install

# 2. Copy build configuration and build sources
COPY Gulpfile.js .babelrc tsconfig.json tslint.json ./
COPY src ./src
RUN npm run build

# 3. Copy static files needed by the server at runtime
COPY .env.example ./
COPY assets/index.html ./assets/index.html

# Run-time stage
################

FROM node:carbon

ENV NODE_ENV production

# 1. Copy package configuration and install (production-only!) dependencies
WORKDIR /app/
COPY --from=build /app-src/package*.json ./
RUN npm install --only=production

# 2. Copy built and static files into the container
COPY --from=build /app-src/lib ./lib
COPY --from=build /app-src/assets/index.html ./assets/index.html
COPY --from=build /app-src/.env.example ./

# 3. Run the server script
# (For some reason, only the exec notation makes SIGTERM work)
CMD ["npm", "start"]