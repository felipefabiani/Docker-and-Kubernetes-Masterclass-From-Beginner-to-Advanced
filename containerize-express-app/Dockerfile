FROM node:22
WORKDIR /app
# Copy package.json and package-lock.json files
COPY package*.json .

# Install dependencies
RUN npm ci

# Copy the source code of our app
COPY src/index.js index.js

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]