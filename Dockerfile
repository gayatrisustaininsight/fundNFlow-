# --- Stage 1: Build the Next.js app ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Build Next.js
RUN npm run build


# --- Stage 2: Production image ---
FROM node:20-alpine
WORKDIR /app

# Copy build output + node_modules
COPY --from=builder /app ./

# Expose Next.js port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
