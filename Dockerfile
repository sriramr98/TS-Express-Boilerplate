FROM node:10

WORKDIR /usr/server

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build
COPY .env ./dist/

EXPOSE 4000
CMD ["yarn", "start"]
