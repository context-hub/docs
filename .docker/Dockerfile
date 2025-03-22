# Clone the project
FROM alpine/git as git

FROM node:19 as node

COPY . /app
WORKDIR /app

RUN npm add -D vitepress
RUN npm i
RUN npm run docs:build

FROM nginx:alpine as server

COPY --from=node /app/docs/.vitepress/dist /usr/share/nginx/html