FROM node:lts-alpine as builder

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 6100

CMD ["npm", "run", "serve"]