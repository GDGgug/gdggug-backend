# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/package*.json ./

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"] 