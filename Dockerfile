# Alpine Linux-based, tiny Node container:
FROM node:14.18-alpine3.14 as base
#FROM node:12-alpine3.9 as base

ADD ./ /opt/app
WORKDIR /opt/app

USER root

RUN rm -rf node_modules \
 && chown -R node /opt/app

USER node


FROM base as release

USER root
RUN apk add --no-cache git
RUN npm install\
 #&& apk add --no-cache tini \
 && npm run build \
 && chown -R node /opt/app

EXPOSE 6001

USER node
ENV HOME_DIR=/opt/app \
    NODE_ENV=dev \
    PORT=6001

ENTRYPOINT npm run start

FROM base as build

USER root
RUN apk add --no-cache git
RUN npm install -g nodemon \
 && npm install \
 && npm run build \
 && chown -R node /opt/app

EXPOSE 6001

USER node

ENTRYPOINT npm run start

#CMD ["node", "webpack-dev-server --hot"]
