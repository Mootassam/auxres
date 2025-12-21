# Use a modern Node version
FROM node:18-alpine

WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install

# Set environment variables
ENV BACKEND_URL="https://binex-exchange.com/api"

# Expose your app port
EXPOSE 8084

# Remove Redis installation and just start your app
CMD ["npm", "start"]