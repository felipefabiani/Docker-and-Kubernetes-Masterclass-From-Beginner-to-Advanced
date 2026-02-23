FROM node:22-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY src src
CMD ["npm", "start"]
