FROM node:22-alpine

WORKDIR /client/

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]