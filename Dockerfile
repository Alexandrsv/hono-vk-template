FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npx prisma generate

CMD ["npm", "start"]



