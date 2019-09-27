FROM node:10-alpine

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
COPY .env ./dist/

EXPOSE 4000
CMD ["npm", "start"]
