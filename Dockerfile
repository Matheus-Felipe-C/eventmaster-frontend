# ————— Build stage —————
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency manifests first
# This takes advantage of Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy entire project
COPY . .

# Build the Vite production static files
RUN npm run build

# ————— Production stage —————
FROM nginx:1.25-alpine

# Remove default NGINX config so we can override
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom NGINX config (below)
COPY nginx.conf /etc/nginx/conf.d/

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
