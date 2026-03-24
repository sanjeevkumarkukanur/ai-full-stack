# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build NestJS app
RUN pnpm build

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "dist/main.js"]