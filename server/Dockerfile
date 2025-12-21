FROM node:14.16.0-alpine3.13
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