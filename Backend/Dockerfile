# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package.json ./package.json

# The user for the prisma client is 'node' by default.
# Ensure the data directory is owned by the 'node' user.
RUN mkdir -p data && chown -R node:node data

USER node

# Before starting, apply database schema.
# Using 'db push' is suitable for development/prototyping. For production, use 'migrate deploy'.
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]

EXPOSE 3001