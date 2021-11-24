FROM node:14.18.1 AS build
WORKDIR /app

COPY app/package.json ./
RUN npm install
COPY app/ .
RUN npm run build

FROM nginx:alpine AS stage
COPY --from=build app/build/ /usr/share/nginx/html
COPY nginxconf.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]