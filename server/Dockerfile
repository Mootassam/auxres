# Use a modern Node version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Clean npm cache and install deps
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables
ENV BACKEND_URL="http://162.0.228.113:8084/api"
RUN apk add --no-cache redis
# Expose your app port
EXPOSE 8084
EXPOSE 6379
# Remove Redis installation and just start your app
CMD ["sh", "-c", "redis-server & npm start"]