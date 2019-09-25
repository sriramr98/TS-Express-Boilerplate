FROM node

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
COPY .env ./dist/

EXPOSE 4000
CMD ["yarn", "start"]
