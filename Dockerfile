# =============================================================================
# Multi-Stage Dockerfile for React Portfolio Application
# Author: Nithin Thadem
# Description: Production-optimized container with nginx for serving static assets
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build Environment
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set build-time arguments
ARG VITE_APP_EMAILJS_SERVICE_ID
ARG VITE_APP_EMAILJS_TEMPLATE_ID
ARG VITE_APP_EMAILJS_PUBLIC_KEY

# Set environment variables for build
ENV VITE_APP_EMAILJS_SERVICE_ID=$VITE_APP_EMAILJS_SERVICE_ID
ENV VITE_APP_EMAILJS_TEMPLATE_ID=$VITE_APP_EMAILJS_TEMPLATE_ID
ENV VITE_APP_EMAILJS_PUBLIC_KEY=$VITE_APP_EMAILJS_PUBLIC_KEY

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --only=production=false && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Production Environment
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Add labels for container metadata
LABEL maintainer="Nithin Thadem"
LABEL description="DevOps Portfolio - React Application"
LABEL version="1.0.0"

# Install curl for healthcheck
RUN apk add --no-cache curl

# Remove default nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# -----------------------------------------------------------------------------
# Stage 3: Development Environment (optional)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
