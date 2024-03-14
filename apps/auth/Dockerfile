FROM node:18.18.2-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir /tmp/app

COPY . /tmp/app/

RUN apk --no-cache add rsync

RUN rsync -a --exclude=apps/gateway --exclude=apps/account /tmp/app/ /usr/src/app/

RUN rm -rf /tmp/app

RUN npm run build auth

FROM node:18.18.2-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN mkdir /tmp/app

COPY . /tmp/app/

RUN apk --no-cache add rsync

RUN rsync -a --exclude=apps/gateway --exclude=apps/account /tmp/app/ /usr/src/app/

RUN rm -rf /tmp/app

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]