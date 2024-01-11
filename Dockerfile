FROM node:alpine

WORKDIR /app

COPY . .
COPY package*.json ./

RUN npm install
RUN npx prisma generate

EXPOSE 3000

CMD npm run dev
