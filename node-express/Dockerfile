FROM node:lts-alpine as builder

RUN npm install -g pm2

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 7011

CMD ["pm2-runtime", "npm", "--", "run", "serve"]