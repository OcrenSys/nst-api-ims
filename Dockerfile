FROM node:14-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean --force
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn", "start:debug" ]
