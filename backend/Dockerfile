FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Environment variables will be provided at runtime
EXPOSE 3050

CMD ["node", "src/server.js"]