FROM node:8-onbuild
WORKDIR /usr/src/app
RUN npm install pm2@3.5.1 -g
EXPOSE 1207
CMD pm2-docker index.js
