# build environment
FROM node:9.11.2 as build
WORKDIR /
# ENV PATH /app/node_modules/.bin:$PATH
COPY / ./
RUN npm install -g yarn@1.22.5
RUN npm install
RUN npm run build:deploy

FROM nginx:1.19.4
COPY --from=build /dist /home/nginx/static/dist
# new
COPY docker/eks/vue/static.conf /etc/nginx/conf.d/static.conf
COPY docker/eks/vue/status.conf /etc/nginx/conf.d/status.conf