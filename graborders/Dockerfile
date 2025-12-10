FROM node:18 as builder
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the project
COPY . .

# Build the project
RUN pnpm run build

# Serve with nginx
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
