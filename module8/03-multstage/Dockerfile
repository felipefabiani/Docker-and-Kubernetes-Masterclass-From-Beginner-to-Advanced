FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json .
RUN npm ci

FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY src ./src
CMD ["src/index.js"]
