# ─── Stage 1: Build / install deps ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (production + dev, for potential build steps)
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Uncomment if you have a build step (e.g. TypeScript compilation)
# RUN npm run build

# ─── Stage 2: Production image ────────────────────────────────────────────────
FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

# Only copy production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy app source (or compiled output if you have a build step)
COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "index.js"]
