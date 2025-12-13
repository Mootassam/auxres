FROM node:18-alpine

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install exact dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# App environment variables
ENV BACKEND_URL="http://162.0.228.113:8084/api"

# Expose backend port only
EXPOSE 8084

# Start backend ONLY (no Redis here)
CMD ["npm", "start"]
