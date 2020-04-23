FROM node:10

WORKDIR /usr/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
