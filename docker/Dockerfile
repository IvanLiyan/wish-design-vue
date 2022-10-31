# build environment
FROM node:16.17.0 as build
WORKDIR /tmp
# ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm run node-i
RUN npm rebuild node-sass
RUN npm run build:deploy

FROM nginx:1.19.4
COPY --from=build /tmp/dist /home/nginx/static/dist
# new
COPY ./docker/static.conf /etc/nginx/conf.d/static.conf
