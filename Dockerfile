FROM oven/bun:canary-alpine

WORKDIR /app

RUN bun --revision

RUN apk update && \
    apk add \
    openssl \
    curl \
    wget \
    git \
    gnupg


RUN apk add nodejs
RUN apk add npm

RUN node --version && \
    npm --version


COPY package.json ./
COPY bun.lockb ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

RUN bun install --force
RUN bun install -g prisma@5.8.0

RUN bun run prisma:generate;
CMD bun run dev


