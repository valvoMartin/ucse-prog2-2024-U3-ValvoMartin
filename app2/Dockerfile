FROM node:22-alpine

WORKDIR /usr/src/app2

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "index.js"]