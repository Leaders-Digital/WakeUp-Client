# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_API_KEY="https://api.wakeup-cosmetics.tn/"
ARG NEXT_PUBLIC_LOCAL="https://api.wakeup-cosmetics.tn/"
ARG NEXT_PUBLIC_HOST="https://wakeup-server.onrender.com/"
ARG NEXT_PUBLIC_KEY="AIzaSyD-1X6JQJ3Q"


# Set environment variables
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_LOCAL=$NEXT_PUBLIC_LOCAL
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_KEY=$NEXT_PUBLIC_KEY

# Build the application with standalone output
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


