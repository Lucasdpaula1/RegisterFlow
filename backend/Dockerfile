FROM node:20-alpine AS base
WORKDIR /app

FROM base AS development
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm install

COPY . .

EXPOSE 3000


FROM base AS build
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci
COPY . .
RUN npm run build


FROM base AS production
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]