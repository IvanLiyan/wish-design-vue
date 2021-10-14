# build environment
FROM node:9.11.2 as build
WORKDIR /tmp
# ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm install
RUN npm run build:deploy

FROM nginx:1.19.4
COPY --from=build /tmp/dist /home/nginx/static/dist
# new
COPY ./docker/static.conf /etc/nginx/conf.d/static.conf
COPY ./docker/status.conf /etc/nginx/conf.d/status.conf