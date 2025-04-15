# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_API_KEY="https://api.wakeup-cosmetics.tn/"
ENV NEXT_PUBLIC_LOCAL="https://api.wakeup-cosmetics.tn/"
ENV NEXT_PUBLIC_HOST="https://wakeup-server.onrender.com/"
ENV NEXT_PUBLIC_KEY="AIzaSyD-1X6JQJ3Q"

# Build the application with standalone output
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


