FROM node:22-alpine

WORKDIR /server/

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]