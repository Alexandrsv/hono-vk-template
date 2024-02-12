FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install unzip
RUN npm install -g bun@1.0.26

RUN node --version && \
    npm --version


COPY package.json ./
COPY bun.lockb ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY .env ./
COPY src ./src

RUN bun install
RUN bun install -g prisma@5.9.1

RUN bun run prisma:generate;
CMD bun run start


